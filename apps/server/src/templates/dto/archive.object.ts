import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArchivePayload {
  @Field()
  readonly success: boolean;
}
