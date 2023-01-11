import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTenantInput {
  @Field({ nullable: true })
  name?: string;
}
