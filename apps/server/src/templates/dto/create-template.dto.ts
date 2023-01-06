import { ApiProperty } from '@nestjs/swagger';
import { TemplateDto } from './template.dto';

export class CreateTemplateDto extends TemplateDto {
  @ApiProperty()
  readonly name: string;
}
