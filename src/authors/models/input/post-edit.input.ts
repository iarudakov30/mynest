import { InputType, PartialType } from '@nestjs/graphql';
import { PostAddInput } from './post-add.input';

@InputType()
export class PostEditInput extends PartialType(PostAddInput) {}
