import { EntityRepository } from '@mikro-orm/mongodb';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { CreateMemberInput } from './dto/create-member.input';
import { UpdateMemberInput } from './dto/update-member.input';
import { Member } from './entities/member.entity';

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: EntityRepository<Member>,
    @Inject(UsersService)
    private readonly userService: UsersService,
    private readonly workspaceService: WorkspacesService,
  ) {}

  async create(createMemberInput: CreateMemberInput) {
    const user = await this.userService.findOne(createMemberInput.userId);
    const workspace = await this.workspaceService.findOne(
      createMemberInput.workspaceId,
    );
    const newMember = {
      ...createMemberInput,
      user,
      workspace,
    };
    const membership = this.memberRepository.create(newMember);
    await this.memberRepository.persistAndFlush(membership);
    return membership;
  }

  async findAll() {
    const members = await this.memberRepository.findAll();
    if (!members) {
      throw new Error('Graphql error - No members found');
    }
    return members;
  }

  async findOne(id: string) {
    const member = await this.memberRepository.findOne(id);
    if (!member) {
      throw new Error('Graphql error - No such member found');
    }
    return member;
  }

  async update(updateMemberInput: UpdateMemberInput) {
    const member = await this.memberRepository.findOne(updateMemberInput.id);
    if (!member) {
      throw new NotFoundException('Graphql error - No such member found');
    }
    member.role = updateMemberInput.role;
    member.owner = updateMemberInput.owner;
    try {
      await this.memberRepository.persistAndFlush(member);
    } catch (error) {
      throw new NotFoundException('No such member found', error);
    }
    return member;
  }

  async remove(id: string) {
    const member = await this.memberRepository.findOne(id);
    if (!member) {
      throw new NotFoundException('GrapphQl error - No such member found');
    }
    try {
      await this.memberRepository.removeAndFlush(member);
    } catch (error) {
      throw new NotFoundException('DB Error', error);
    }
    return member;
  }
}
