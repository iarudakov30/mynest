import { Resolver, Args, Mutation } from '@nestjs/graphql';

import { EventType } from '../types/event.type';
import { EventService } from '../services/event.service';
import { EventEntity } from '../entities/event.entity';

@Resolver(() => EventType)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Mutation(() => EventType, { name: 'addEvent' })
  async addEvent(@Args('name') name: string): Promise<EventEntity> {
    return this.eventService.createEvent(name);
  }
}
