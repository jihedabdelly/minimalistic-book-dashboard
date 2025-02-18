import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  description: string;
}