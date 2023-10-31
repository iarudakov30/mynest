import { Module } from '@nestjs/common';
import { AuthorsResolver } from './resolvers/authors.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './schemas/author.schema';
import { PostSchema } from './schemas/post.schema';
import { PostsResolver } from './resolvers/posts.resolver';

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
      }
    ])
  ],
  providers: [AuthorsResolver, PostsResolver]
})
export class AuthorsModule {}
