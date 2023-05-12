import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class UpdatePositionInput {

  @Field(()=> ID)
  id: string;

  @Field(()=> Int)
  position: number;
}
