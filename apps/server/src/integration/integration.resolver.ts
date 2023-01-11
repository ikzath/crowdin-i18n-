import { Query, Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateIntegrationInput } from './dto/create-integration.input';
import { Integration } from './dto/integration.object';
import { IntegrationService } from './integration.service';

@Resolver(() => Integration)
export class IntegrationResolver {
  constructor(private readonly integrationService: IntegrationService) {}

  //Queries
  @Query(() => String)
  getTest() {
    return this.integrationService.getTest();
  }

  @Query(() => [Integration], { name: 'integrations' })
  findAll() {
    return this.integrationService.findAll();
  }

  //Mutations
  @Mutation(() => Integration, { name: 'clientIntegrationCreate' })
  async createNewIntegration(
    @Args('createIntegrationInput')
    createIntegrationInput: CreateIntegrationInput,
  ) {
    return this.integrationService.create(createIntegrationInput);
  }
}
