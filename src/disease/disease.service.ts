import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Disease } from "./entities/disease.entity";

@Injectable()
export class DiseaseService {
  constructor(
    @InjectRepository(Disease)
    private readonly diseaseRepository: Repository<Disease>
  ) { }

  async add(disease: Disease): Promise<Disease> {
    return this.diseaseRepository.save(disease);
  }

  async findAll(): Promise<Disease[]> {
    return this.diseaseRepository.find();
  }
}
