import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateFeedbackInput {
  
  @Field()
  subject: string;

  @Field()
  message: string;

  @Field({nullable: true})
  name?: string;

  @Field({nullable: true})
  phoneNumber?: string;

  @Field(()=> ID, {nullable: true})
  user?: string;

}
