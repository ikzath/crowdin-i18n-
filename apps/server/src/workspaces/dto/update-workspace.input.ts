import { CreateWorkspaceInput } from './create-workspace.input';
import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';

@InputType()
export class UpdateWorkspaceInput extends PartialType(
  OmitType(CreateWorkspaceInput, ['tenantId'] as const),
) {
  @Field()
  id: string;
}
