import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DiseaseFilterCriteria } from './dto/disease-filter-criteria.interface';
import { Disease } from "./entities/disease.entity";

type Where = {
  authority?: string;
  location?: string;
  age?: string;
  vacinationStatus?: string;
  intent?: string;
}

type Select = {
  [name: string]: boolean
}

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseaseRepository: Repository<Disease>
  ) { }

  async add(disease: Disease): Promise<Disease> {
    return this.diseaseRepository.save(disease);
  }

  async find(criteria: DiseaseFilterCriteria, select?: Select): Promise<Disease[]> {
    return this.diseaseRepository.find({ where: this.parseCriteria(criteria), select: select });
  }

  private parseCriteria(criteria: DiseaseFilterCriteria): Where | null {
    let where: Where = {};
    if (criteria.authority && criteria.authority.trim()) where.authority = criteria.authority;
    if (criteria.location && criteria.location.trim()) where.location = criteria.location;
    if (criteria.age && criteria.age.trim()) where.age = criteria.age;
    if (criteria.vacination_status && criteria.vacination_status.trim()) where.vacinationStatus = criteria.vacination_status;
    if (criteria.intent && criteria.intent.trim()) where.intent = criteria.intent;
    return !Object.keys(where).length ? null : where;
  }
}
