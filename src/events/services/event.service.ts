import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EventEntity } from '../entities/event.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>
  ) {}

  async createEvent(name: string): Promise<EventEntity> {
    const event: EventEntity = this.eventRepository.create({
      id: 1,
      name: name,
      status: true
    });

    return this.eventRepository.save(event);
  }
}
