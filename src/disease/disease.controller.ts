import { Controller, Get, Query } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseFilterCriteria } from "./dto/disease-filter-criteria.interface";
import { Disease } from './entities/disease.entity';

@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) { }

  @Get('history')
  getHistoricalData(@Query() criteria: DiseaseFilterCriteria): Promise<Disease[]> {
    return this.diseaseService.find(criteria);
  }

  @Get('advice')
  async getAdvice(@Query() criteria: DiseaseFilterCriteria): Promise<string[]> {
    const advice: Set<string> = new Set();
    (await this.diseaseService.find(criteria, { advice: true })).forEach(res => advice.add(res.advice));
    return Array.from(advice);
  }
}
