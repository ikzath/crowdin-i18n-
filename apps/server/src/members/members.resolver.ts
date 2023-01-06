import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { MemberObject } from './dto/member.object';

@Resolver(() => MemberObject)
export class MembersResolver {
  constructor(private readonly membersService: MembersService) {}

  @Mutation(() => MemberObject, { name: 'workspaceMembershipCreate' })
  createMember(
    @Args('createMemberInput') createMemberInput: CreateMemberInput,
  ) {
    return this.membersService.create(createMemberInput);
  }

  @Query(() => [MemberObject], { name: 'members' })
  findAll() {
    return this.membersService.findAll();
  }

  @Query(() => MemberObject, { name: 'member' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.membersService.findOne(id);
  }

  @Mutation(() => MemberObject)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ) {
    return this.membersService.update(updateMemberInput.id, updateMemberInput);
  }

  @Mutation(() => MemberObject)
  removeMember(@Args('id', { type: () => Int }) id: number) {
    return this.membersService.remove(id);
  }
}
