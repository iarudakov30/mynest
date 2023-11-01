import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './entities/event.entity';
import { EventService } from './services/event.service';
import { EventResolver } from './resolvers/event.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  providers: [EventService, EventResolver]
})
export class EventsModule {}
