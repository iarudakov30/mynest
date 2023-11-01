import { Module } from '@nestjs/common';
import { AuthorsResolver } from './resolvers/authors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './schemas/author.schema';
import { PostSchema } from './schemas/post.schema';
import { PostsResolver } from './resolvers/posts.resolver';
import { ClientSchema } from './schemas/client.schema';
import { ClientResolver } from './resolvers/client.resolver';
import { AuthorRepository } from './repositories/author.repository';
import { PostRepository } from './repositories/post.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Author',
        schema: AuthorSchema
      },
      {
        name: 'Post',
        schema: PostSchema
      },
      {
        name: 'Client',
        schema: ClientSchema
      }
    ])
  ],
  providers: [
    AuthorsResolver,
    PostsResolver,
    ClientResolver,
    AuthorRepository,
    PostRepository
  ]
})
export class AuthorsModule {}
