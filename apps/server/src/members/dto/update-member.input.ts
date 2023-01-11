import { CreateMemberInput } from './create-member.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateMemberInput extends PartialType(CreateMemberInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  owner?: boolean;

  @Field({ nullable: true })
  role?: string;
}
