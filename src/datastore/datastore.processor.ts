import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Job } from "bull";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs/operators";
import { DiseaseService } from "src/disease/disease.service";
import { Disease } from "src/disease/entities/disease.entity";
import { DatastoreService } from "./datastore.service";

type APIResponse = {
  data: {
    meta: any,
    data: any[]
  }
}

@Processor('datastore')
export class DatastoreProcessor {
  constructor(private readonly datastoreService: DatastoreService, private readonly diseaseService: DiseaseService, private readonly httpService: HttpService, private readonly configService: ConfigService) { }

  private readonly logger = new Logger(DatastoreProcessor.name);

  @Process('sync')
  async syncDatastore(job: Job) {
    this.logger.debug(`Starting datastore sync for job id: ${job.id}.`);
    const data = await firstValueFrom(
      this.httpService.get(this.configService.get('DATASTORE_URL')).pipe(
        map((res: APIResponse) => res.data.data)
      )
    ),
      itrSize = data.length;
    if (itrSize) {
      this.logger.debug(`Processing dataset of size: ${itrSize} for job id: ${job.id}`);
      this.datastoreService.updateJob(job, data, 10);
      while (data.length) {
        await this.diseaseService.add(this.parseData(data.shift()));
        this.datastoreService.updateJob(job, data, data.length <= itrSize / 2 ? 50 : 10);
      }
    } else this.logger.debug(`No dataset to process for job id: ${job.id}.`)
    this.datastoreService.updateJob(job, null, 100);
    this.logger.debug(`Datastore sync for job id: ${job.id} is now completed.`);
  }

  private parseData(data: any[]): Disease {
    const disease = new Disease();
    disease.id = data[0];
    disease.createdAt = data[3];
    disease.updatedAt = data[5];
    disease.authority = data[8].split(' ')[0];
    disease.location = data[9];
    disease.age = data[10] == 'All adults 18+' ? data[10] : 'Unknown';
    disease.vacinationStatus = data[11].startsWith('Vaccinated') || data[11].startsWith('Received updated bivalent booster dose') ? 'Vaccinated' : 'Unvaccinated';
    disease.intent = data[11] == 'Overall' || data[11].startsWith('Vaccinated') || data[11].startsWith('Received updated bivalent booster dose') ? 'NA' : data[11];
    disease.advice = data[13];
    disease.timePeriod = data[14];
    disease.year = data[15];
    disease.timeType = data[16];
    disease.estimate = data[17];
    disease.confidenceInterval = data[18];
    disease.sampleSize = data[19];
    return disease;
  }
}