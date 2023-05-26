import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Feedback } from './feedback.entity';

@ObjectType()
export class FeedbacksLimit {
  
  @Field(() => [Feedback])
  data: Feedback[];

  @Field(()=> Int)
  pages: number;

}
