import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Tenant {
  @Field()
  id: string;

  @Field()
  name: string;
}
