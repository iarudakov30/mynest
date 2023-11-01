import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity({ name: 'events' })
export class EventEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: boolean;
}
