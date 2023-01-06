import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@Controller('templates')
// @UseGuards(BearerAuthGuard)
@ApiTags('templates')
@ApiBearerAuth()
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post(':id')
  @ApiOperation({ summary: 'Insert sample JSON da' })
  @ApiParam({ name: 'id' })
  insertSample(@Param('id') id: string) {
    return this.templatesService.insertSample(id);
  }

  /**
   * Generate a template
   * @param createTemplateDto
   * @returns
   */
  @Post()
  @ApiOperation({ summary: 'Create a template' })
  create(@Request() request, @Body() createTemplateDto: CreateTemplateDto) {
    return this.templatesService.create(createTemplateDto);
  }

  @Get()
  @Throttle(10, 60)
  @ApiResponse({ status: 200, description: 'OK' })
  findAll(@Request() request) {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Template ID' })
  async findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
  ) {
    return this.templatesService.update(id, updateTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.templatesService.remove(+id);
  }

  @Post(':id/paragraphs')
  createParagraphs(@Param('id') id: string) {
    return this.templatesService.insertSampleParagraphs(id);
  }
}
