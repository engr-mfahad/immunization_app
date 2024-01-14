import { Controller, Get, Query } from '@nestjs/common';
import { DiseaseService } from './disease.service';
import { DiseaseFilterCriteria } from "./dto/disease-filter-criteria.interface";
import { Disease } from './entities/disease.entity';

@Controller('disease')
export class DiseaseController {
  constructor(private readonly diseaseService: DiseaseService) {}

  @Get('history')
  getHistoricalData(@Query() criteria: DiseaseFilterCriteria): Promise<Disease[]> {
    console.log(criteria);
    return this.diseaseService.findAll();
  }
}
