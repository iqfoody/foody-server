import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import { Tag } from './entities/tag.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Tag)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @Mutation(() => Tag)
  @CheckAbilities({actions: Actions.Create, subject: Tag})
  createTag(@Args('createTagInput') createTagInput: CreateTagInput) {
    return this.tagsService.create(createTagInput, null);
  }

  @Query(() => [Tag], { name: 'tags' })
  @CheckAbilities({actions: Actions.Read, subject: Tag})
  findAll() {
    return this.tagsService.findAll();
  }

  @Query(() => Tag, { name: 'tag' })
  @CheckAbilities({actions: Actions.Read, subject: Tag})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tagsService.findOne(id);
  }

  @Mutation(() => Tag)
  @CheckAbilities({actions: Actions.Update, subject: Tag})
  updateTag(@Args('updateTagInput') updateTagInput: UpdateTagInput) {
    return this.tagsService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => Tag)
  @CheckAbilities({actions: Actions.Delete, subject: Tag})
  removeTag(@Args('id', { type: () => ID }) id: string) {
    return this.tagsService.remove(id);
  }
}