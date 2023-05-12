import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from './entities/feedback.entity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';

@UseGuards(AccessAuthGuard)
@Resolver(() => Feedback)
export class FeedbacksResolver {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Query(() => [Feedback], { name: 'feedbacks' })
  @CheckAbilities({actions: Actions.Read, subject: Feedback})
  findAll() {
    return this.feedbacksService.findAll();
  }

  @Query(() => Feedback, { name: 'feedback' })
  @CheckAbilities({actions: Actions.Read, subject: Feedback})
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.feedbacksService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: Feedback})
  removeFeedback(@Args('id', { type: () => ID }) id: string) {
    return this.feedbacksService.remove(id);
  }
}
