import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MembersService } from './members.service';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { MemberDeletePayload } from './dto/member.payload';
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
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.membersService.findOne(id);
  }

  @Mutation(() => MemberObject)
  updateMember(
    @Args('updateMemberInput') updateMemberInput: UpdateMemberInput,
  ) {
    return this.membersService.update(updateMemberInput);
  }

  // @Mutation(() => MemberArchivePayload, { name: 'workspaceMembershipArchive' })
  // archiveMember(@Args('id', { type: () => String }) id: string) {
  //   const member = this.membersService.archive(id);
  //   // const member = this.membersService.findOne(id);
  //   return { member, success: true };
  // }

  @Mutation(() => MemberDeletePayload, { name: 'workspaceMembershipDelete' })
  removeMember(@Args('id', { type: () => String }) id: string) {
    this.membersService.remove(id);
    return { success: true };
  }
}
