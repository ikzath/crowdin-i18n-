import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TenantsService } from './tenants.service';
import { Tenant } from './dto/tenant.object';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { GqlCurrentUser } from 'src/auth/decorators/gql-current-user.decorator';

@Resolver(() => Tenant)
@UseGuards(GqlAuthGuard)
export class TenantsResolver {
  constructor(private readonly tenantsService: TenantsService) {}

  @Mutation(() => Tenant, { name: 'tenantCreate' })
  createTenant(
    @GqlCurrentUser() user: User,
    @Args('createTenantInput')
    createTenantInput: CreateTenantInput,
  ) {
    return this.tenantsService.create(createTenantInput, user);
  }

  @Query(() => [Tenant], { name: 'tenants' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Query(() => Tenant, { name: 'tenant' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tenantsService.findOne(id);
  }

  @Mutation(() => Tenant, { name: 'tenantUpdate' })
  async updateTenant(
    @Args('updateTenantInput') updateTenantInput: UpdateTenantInput,
  ) {
    return this.tenantsService.update(updateTenantInput);
  }

  @Mutation(() => Tenant, { name: 'tenantDelete' })
  removeTenant(@Args('id', { type: () => String }) id: string) {
    return this.tenantsService.remove(id);
  }
}
