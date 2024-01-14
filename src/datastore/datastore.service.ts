import { InjectQueue } from "@nestjs/bull";
import { Injectable } from '@nestjs/common';
import { Job, Queue } from "bull";

@Injectable()
export class DatastoreService {
  constructor(@InjectQueue('datastore') private readonly datastoreQueue: Queue) { }

  async createJob(): Promise<string> {
    const jobId = `${Date.now()}`;
    await this.datastoreQueue.add('sync', null, { jobId: jobId });
    return jobId;
  }

  updateJob(job: Job, data: any, progress: number = 0) {
    job.update(data);
    job.progress(progress);
  }

  async jobStatus(jobId: string): Promise<string> {
    let status = 'Invalid';
    const job = await this.datastoreQueue.getJob(jobId);
    if (job) status = `${!(await job.progress()) ? 'InQueue' : 'Finished'}`;
    return status;
  }
}
