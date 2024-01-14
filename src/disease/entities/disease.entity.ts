import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Disease {
  @PrimaryColumn()
  id: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @Column()
  authority: string;

  @Column()
  location: string;

  @Column()
  age: string;

  @Column()
  vacinationStatus: string;

  @Column()
  intent: string;

  @Column()
  advice: string;

  @Column()
  timePeriod: string;

  @Column()
  year: string;

  @Column()
  timeType: string;

  @Column()
  estimate: string;

  @Column()
  confidenceInterval: string;

  @Column()
  sampleSize: string;
}
