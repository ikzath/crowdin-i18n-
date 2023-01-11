import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Workspace {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}

@ObjectType()
export class WorkspacePayload {
  @Field()
  workspace: Workspace;

  @Field()
  success: boolean;
}
