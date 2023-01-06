import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTenantInput {
  @Field()
  name: string;
}
