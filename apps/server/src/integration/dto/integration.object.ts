import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Integration {
  @Field()
  name: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
