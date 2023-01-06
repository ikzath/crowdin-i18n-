import { ApiProperty } from '@nestjs/swagger';
import { Template } from '../entities/template.entity';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TemplateDto {
  constructor(
    partial: Pick<Template, 'id' | 'name' | 'createdAt' | 'updatedAt'>,
  ) {
    Object.assign(this, partial);
  }
  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly name: string;

  @Expose()
  @ApiProperty()
  readonly createdAt: Date;

  @Expose()
  @ApiProperty()
  readonly updatedAt: Date;
}
