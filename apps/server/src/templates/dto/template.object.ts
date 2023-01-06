/**
 * GraphQL Schema
 */
import { Field, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { TemplateOptions } from './template-options.object';

@ObjectType('data')
export class TemplateData {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => GraphQLJSON)
  content: object;
}

@ObjectType('Template')
export class TemplateObject {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly archived: boolean;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly updatedAt: Date;

  @Field({ nullable: true })
  readonly options?: TemplateOptions;

  // @Field(() => GraphQLJSON, { nullable: true })
  // readonly data?: object;
  @Field(() => TemplateData)
  readonly data?: TemplateData;
}
