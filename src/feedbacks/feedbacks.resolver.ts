import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { FeedbacksService } from './feedbacks.service';
import { Feedback } from './entities/feedback.entity';
import { AccessAuthGuard } from 'src/guards/accessAuth.guard';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { CheckAbilities } from 'src/ability/ability.decorator';
import { Actions } from 'src/ability/ability.factory';
import { LimitEntity } from 'src/constants/limitEntity';
import { FeedbacksLimit } from './entities/feedbacks-limit.entity';
import { isValidObjectId } from 'mongoose';

@UseGuards(AccessAuthGuard)
@Resolver(() => Feedback)
export class FeedbacksResolver {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Query(() => FeedbacksLimit, { name: 'feedbacks' })
  @CheckAbilities({actions: Actions.Read, subject: "Feedback"})
  findAll(@Args('limitEntity') limitEntity: LimitEntity) {
    return this.feedbacksService.findAll(limitEntity);
  }

  @Query(() => Feedback, { name: 'feedback' })
  @CheckAbilities({actions: Actions.Read, subject: "Feedback"})
  findOne(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't feedback with this id");
    return this.feedbacksService.findOne(id);
  }

  @Mutation(() => String)
  @CheckAbilities({actions: Actions.Delete, subject: "Feedback"})
  removeFeedback(@Args('id', { type: () => ID }) id: string) {
    if(!isValidObjectId(id)) throw new BadRequestException("There isn't feedback with this id");
    return this.feedbacksService.remove(id);
  }
}
