import {
  Resolver,
  Args,
  Query,
  ID,
  Mutation,
  ResolveField,
  Parent
} from '@nestjs/graphql';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Logger } from '@nestjs/common';
import { Client } from '../schemas/client.schema';
import { ClientAddInput } from '../models/input/client-add.input';

@Resolver(() => Client)
export class ClientResolver {
  private readonly logger: Logger = new Logger(ClientResolver.name);

  constructor(@InjectModel(Client.name) private clientModel: Model<Client>) {}

  @Mutation(() => Client, { name: 'addClient' })
  async addClient(
    @Args('input', { type: () => ClientAddInput }) input: ClientAddInput
  ): Promise<Client> {
    const newClient = new this.clientModel(input);
    await newClient.save();
    return newClient.toObject({ versionKey: false });
  }

  @ResolveField('posts')
  async posts(@Parent() author: Client) {
    this.logger.debug('@ResolveField posts executed');
    return author.posts;
  }
}
