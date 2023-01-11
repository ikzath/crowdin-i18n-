import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { TemplateObject } from 'src/templates/dto/template.object';

@ObjectType('TemplatePayload')
export class TemplateCreatePayload {
  @Field()
  template: TemplateObject;

  @Field()
  success: string;
}

@ObjectType('TemplateArchivePayload')
export class TemplateArchivePayload {
  @Field()
  template: TemplateObject;

  @Field()
  readonly success: boolean;
}

@ObjectType('TemplateNotFound')
export class TemplateNotFound {
  @Field()
  message: string;
}

@ObjectType('TemplateArchived')
export class TemplateArchived {
  @Field()
  success: boolean;
}

export const ResultUnion = createUnionType({
  name: 'ResultUnion',
  types: () => [TemplateNotFound, TemplateArchived] as const,
});

// export type ResultUnion = TemplateNotFound | TemplateArchived;
