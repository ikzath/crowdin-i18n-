import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParagraphInput } from './dto/paragraph.input';
import { CreateTemplateInput } from './dto/create-template.input';
import { ParagraphObject } from './dto/paragraph.object';
import { TemplateObject } from './dto/template.object';
import { TemplatesService } from './templates.service';
import { UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/auth/decorators/gql-current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import {
  ResultUnion,
  TemplateArchived,
  TemplateArchivePayload,
  TemplateCreatePayload,
} from 'src/tenants/dto/template.payload';

@Resolver(() => TemplateObject)
@UseGuards(GqlAuthGuard)
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

  @Mutation(() => TemplateCreatePayload, { name: 'templateCreate' })
  async createTemplate(
    @GqlCurrentUser() user: User,
    @Args('createTemplateInput') createTemplateInput: CreateTemplateInput,
  ) {
    const template = await this.templatesService.create(
      createTemplateInput,
      user,
    );
    if (!template) {
      // TODO: use exception
      console.error('template not created');
    }
    return {
      template,
      success: 'true',
    };
  }

  // Mutation resolver for archiving a template
  @Mutation(() => TemplateArchivePayload, { name: 'templateArchive' })
  async archiveTemplate(@Args('id') id: string) {
    const template = await this.templatesService.archive(id);
    return {
      template,
      success: true,
    };
  }
}
