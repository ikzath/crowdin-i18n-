import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateIntegrationInput {
  @Field()
  name: string;

  // @Field()
  // createdAt: Date;

  // @Field()
  // updatedAt: Date;
}
