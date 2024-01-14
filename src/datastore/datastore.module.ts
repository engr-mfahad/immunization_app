import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiseaseService } from "src/disease/disease.service";
import { Disease } from "src/disease/entities/disease.entity";
import { DatastoreController } from './datastore.controller';
import { DatastoreProcessor } from "./datastore.processor";
import { DatastoreService } from './datastore.service';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'datastore'
    }),
    TypeOrmModule.forFeature([Disease])
  ],
  controllers: [DatastoreController],
  providers: [DatastoreService, DatastoreProcessor, DiseaseService],
})
export class DatastoreModule { }
