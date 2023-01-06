import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Member')
export class MemberObject {
  @Field()
  readonly id: string;
}
