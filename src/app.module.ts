import { BullModule } from "@nestjs/bull";
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatastoreModule } from './datastore/datastore.module';
import { DiseaseModule } from './disease/disease.module';
import { Disease } from "./disease/entities/disease.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('QUEUE_HOST'),
          port: configService.get('QUEUE_PORT'),
          password: configService.get('QUEUE_PSWD')
        }
      }),
      inject: [ConfigService]
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        database: configService.get('DATABASE_NAME'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PSWD'),
        entities: [Disease],
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    DatastoreModule,
    DiseaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
