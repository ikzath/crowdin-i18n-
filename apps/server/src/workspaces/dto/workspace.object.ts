import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Workspace {
  @Field()
  id: string;

  @Field()
  name: string;
}
