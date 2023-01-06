import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkspaceInput {
  @Field()
  tenantId: string;

  @Field()
  name: string;
}
