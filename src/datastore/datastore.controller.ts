import { Controller, Get, Param, Post } from '@nestjs/common';
import { DatastoreService } from './datastore.service';

@Controller('datastore')
export class DatastoreController {
  constructor(private readonly datastoreService: DatastoreService) { }

  @Post('sync')
  async refreshDatastore(): Promise<string> {
    const jobId = await this.datastoreService.createJob();
    return jobId;
  }

  @Get('job/:id/status')
  async getJobStatus(@Param('id') jobId: string): Promise<string> {
    const status = await this.datastoreService.jobStatus(jobId);
    return status;
  }
}
