/* 
GraphQL Schema
 */
import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@ObjectType('Paragraph')
export class ParagraphObject {
  @Field()
  readonly id: string;

  @Field()
  readonly templateId: string;

  @Field({ nullable: true })
  readonly type: string;

  @Field(() => [GraphQLJSON], { nullable: true })
  runs?: object[];

  @Field()
  readonly order: number;

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
