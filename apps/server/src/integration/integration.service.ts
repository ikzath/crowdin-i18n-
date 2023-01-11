import { Injectable } from '@nestjs/common';
import { Integrations } from './entities/integration.entity';
import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { CreateIntegrationInput } from './dto/create-integration.input';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(Integrations)
    private readonly integrationRepository: EntityRepository<Integrations>,
  ) {}

  async create(createIntegrationInput: CreateIntegrationInput) {
    const newIntegration = this.integrationRepository.create(
      createIntegrationInput,
    );
    await this.integrationRepository.persistAndFlush(newIntegration);
    return newIntegration;
  }

  findAll() {
    return this.integrationRepository.findAll();
  }

  getTest(): string {
    return `This action returns all members`;
  }
}
