import { Field, ObjectType } from '@nestjs/graphql';
import { MemberObject } from './member.object';

@ObjectType('deleteMemberPayload')
export class MemberDeletePayload {
  @Field()
  readonly success: boolean;
}
