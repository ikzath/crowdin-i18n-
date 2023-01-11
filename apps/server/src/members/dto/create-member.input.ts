import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMemberInput {
  @Field({ nullable: true })
  owner?: boolean;

  @Field({ nullable: true })
  sortOrder?: number;

  @Field({ nullable: true })
  role?: string;

  @Field()
  workspaceId: string;

  @Field()
  userId: string;
}
