import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkspaceInput {
  @Field()
  tenantId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  timezone?: string;

  // @Field({ nullable: true })
  // visibility?: string;
}
