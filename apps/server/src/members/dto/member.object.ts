import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Member')
export class MemberObject {
  @Field()
  readonly id: string;

  @Field()
  readonly owner: boolean;

  @Field()
  readonly role: string;
}
