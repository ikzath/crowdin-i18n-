import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('TemplateOptions')
export class TemplateOptions {
  @Field()
  readonly multiLingual: boolean;

  @Field(() => [String])
  readonly languages: string[];
}
