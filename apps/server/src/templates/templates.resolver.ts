import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParagraphInput } from './dto/paragraph.input';
import { ArchivePayload } from './dto/archive.object';
import { CreateTemplateInput } from './dto/create-template.input';
import { ParagraphObject } from './dto/paragraph.object';
import { TemplateObject } from './dto/template.object';
import { TemplatesService } from './templates.service';

@Resolver(() => TemplateObject)
export class TemplatesResolver {
  constructor(private readonly templatesService: TemplatesService) {}
  @Query(() => [TemplateObject], {
    name: 'templates',
    description: 'Get all templates',
  })
  async getTemplates() {
    return this.templatesService.findAll();
  }

  @Query(() => TemplateObject, { name: 'template', nullable: true })
  async getTemplate(@Args('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Query(() => [ParagraphObject], { name: 'paragraphs', nullable: true })
  async getParagraphs(@Args('templateId') templateId: string) {
    return this.templatesService.findParagraphs(templateId);
  }

  @Mutation(() => ParagraphObject, { name: 'addParagraph' })
  async addParagraph(@Args('paragraph') paragraph: ParagraphInput) {
    return this.templatesService.addParagraph(paragraph);
  }

  @Mutation(() => TemplateObject, { name: 'templateCreate' })
  async createTemplate(
    @Args('createTemplateInput') createTemplateInput: CreateTemplateInput,
  ) {
    return this.templatesService.create(createTemplateInput);
  }

  @Mutation(() => ArchivePayload, { name: 'templateArchive' })
  async archiveTemplate(@Args('id') id: string) {
    const result = await this.templatesService.archive(id);
    return { success: result };
  }
}
