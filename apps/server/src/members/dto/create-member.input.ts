import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field()
  owner: boolean;

  @Field()
  sortOrder: number;

  @Field()
  workspaceId: string;

  @Field()
  userId: string;
}
