import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { Template } from './entities/template.entity';
import { TemplateRepository } from './template.repository';

import sample from './sample/sample';
import { sampleParagraphElement } from './sample/sample';
import { Paragraph } from 'src/templates/entities/paragraph.entity';
import { ParagraphRepository } from './paragraph.repository';
import { ParagraphInput } from './dto/paragraph.input';
import { QueryOrder } from '@mikro-orm/core';
import { CreateTemplateInput } from './dto/create-template.input';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectRepository(Template)
    private readonly templateRepository: TemplateRepository,
    @InjectRepository(Paragraph)
    private readonly paragraphRepository: ParagraphRepository,
  ) {}

  async insertSample(id: string) {
    await this.templateRepository.nativeUpdate(id, {
      data: sample,
    });
  }

  async create(
    createTemplateDto: CreateTemplateDto | CreateTemplateInput,
    user,
  ) {
    const template = this.templateRepository.create({
      ...createTemplateDto,
    });
    template.createdBy = user;
    template.updatedBy = user;
    await this.templateRepository.persist(template).flush();
    return template;
  }

  async findAll() {
    const templates = await this.templateRepository.findAll();
    if (!templates) {
      throw new Error('Graphql error - No templates found');
    }
    return templates;
  }

  async findOne(id: string) {
    const template = await this.templateRepository.findOne(id);
    if (!template) {
      throw new Error('Graphql error - No such template found');
    }
    return template;
  }

  update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  // Function to archive a template
  async archive(id: string) {
    // Find the template
    const template = await this.templateRepository.findOne(id);

    // IF template exists or throw an error
    if (!template) {
      throw new NotFoundException('GrapphQl error - No such template exists');
    }
    // If template is already archived, throw an error
    if (template.archived) {
      throw new NotFoundException(
        'GrapphQl error - Template is already archived',
      );
    }
    // Set the archived flag to true and update the updatedAt field
    template.archived = true;
    template.archivedAt = new Date();
    // Persist and flush the changes
    try {
      await this.templateRepository.persistAndFlush(template);
    } catch (error) {
      throw new NotFoundException('DB Error', error);
    }
    // Return the saved template object
    return template;
  }

  async remove(id: string) {
    const template = await this.templateRepository.findOne(id);
    if (!template) {
      throw new NotFoundException(
        'GrapphQl/Http  error - No such template found',
      );
    }
    try {
      await this.templateRepository.removeAndFlush(template);
    } catch (error) {
      throw new NotFoundException('DB Error', error);
    }
    return template;
  }

  async insertSampleParagraphs(templateId: string) {
    // create array for the paragraphs
    const paragraphs = [];
    // push new paragraph entities to the array
    for (let i = 0; i < 10000; i++) {
      paragraphs.push(
        this.paragraphRepository.create({
          templateId,
          ...sampleParagraphElement,
          order: i,
        }),
      );
    }
    // persist and flush the array of paragraphs
    await this.paragraphRepository.persistAndFlush(paragraphs);
    // return the number of inserted elements
    return paragraphs.length;
  }

  async findParagraphs(templateId: string) {
    const result = await this.paragraphRepository.find(
      { templateId },
      { orderBy: { order: QueryOrder.ASC } },
    );
    return result;
  }

  async addParagraph(paragraphObj: ParagraphInput) {
    const paragraph = await this.paragraphRepository.create(paragraphObj);
    await this.paragraphRepository.persistAndFlush(paragraph);
    return paragraph;
  }
}
