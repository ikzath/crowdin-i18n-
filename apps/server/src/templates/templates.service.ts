import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
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

  async create(createTemplateDto: CreateTemplateDto | CreateTemplateInput) {
    const template = this.templateRepository.create({
      ...createTemplateDto,
    });
    await this.templateRepository.persist(template).flush();
    return template;
  }

  async findAll() {
    return this.templateRepository.findAll();
  }

  async findOne(id: string) {
    return this.templateRepository.findOne(id);
  }

  update(id: string, updateTemplateDto: UpdateTemplateDto) {
    return `This action updates a #${id} template`;
  }

  async archive(id: string) {
    const template = await this.templateRepository.findOne(id);
    template.archived = true;
    await this.templateRepository.persistAndFlush(template);
    return true;
  }

  remove(id: number) {
    return `This action removes a #${id} template`;
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
