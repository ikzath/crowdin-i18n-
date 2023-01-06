import {
  Field,
  InputType,
  IntersectionType,
  OmitType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { TemplateObject } from './template.object';

@InputType()
export class CreateTemplateInput extends IntersectionType(
  PickType(TemplateObject, ['name'] as const, InputType),
  PartialType(
    OmitType(
      TemplateObject,
      ['id', 'archived', 'data', 'options'] as const,
      InputType,
    ),
  ),
) {}
