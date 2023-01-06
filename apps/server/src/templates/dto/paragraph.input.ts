/* 
GraphQL Schema
 */
import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType('ParagraphInput')
export class ParagraphInput {
  @Field()
  readonly templateId: string;

  @Field()
  readonly type: string;

  @Field(() => [GraphQLJSON], { nullable: true })
  runs?: object[];

  @Field(() => [String], { nullable: true })
  rules?: string[];

  @Field({ nullable: true })
  indentation?: number;

  @Field({ nullable: true })
  alignment?: string;

  @Field(() => GraphQLJSON, { nullable: true })
  options?: object;

  @Field({ nullable: true })
  style?: string;

  @Field({ nullable: true })
  function?: string;
}
