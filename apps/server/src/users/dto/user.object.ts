import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class UserObject {
  @Field(() => String)
  readonly id: string;

  @Field()
  readonly email: string;

  @Field({ nullable: true })
  readonly firstName: string;

  @Field({ nullable: true })
  readonly lastName: string;
}
