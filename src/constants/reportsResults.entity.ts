import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Days {

  @Field(() => Int)
  d1: number; 

  @Field(() => Int)
  d2: number; 

  @Field(() => Int)
  d3: number; 

  @Field(() => Int)
  d4: number; 

  @Field(() => Int)
  d5: number; 

  @Field(() => Int)
  d6: number; 

  @Field(() => Int)
  d7: number; 

  @Field(() => Int)
  d8: number; 

  @Field(() => Int)
  d9: number; 

  @Field(() => Int)
  d10: number; 

  @Field(() => Int)
  d11: number; 

  @Field(() => Int)
  d12: number; 

  @Field(() => Int)
  d13: number; 

  @Field(() => Int)
  d14: number; 

  @Field(() => Int)
  d15: number; 

  @Field(() => Int)
  d16: number; 

  @Field(() => Int)
  d17: number; 

  @Field(() => Int)
  d18: number; 

  @Field(() => Int)
  d19: number; 

  @Field(() => Int)
  d20: number; 

  @Field(() => Int)
  d21: number; 

  @Field(() => Int)
  d22: number; 

  @Field(() => Int)
  d23: number; 

  @Field(() => Int)
  d24: number; 

  @Field(() => Int)
  d25: number; 

  @Field(() => Int)
  d26: number; 

  @Field(() => Int)
  d27: number; 

  @Field(() => Int, {nullable: true})
  d28: number; 

  @Field(() => Int, {nullable: true})
  d29?: number; 

  @Field(() => Int, {nullable: true})
  d30?: number;

  @Field(() => Int, {nullable: true})
  d31?: number; 
}

@ObjectType()
export class Months {
  @Field(() => Days)
  m0: Days; 

  @Field(() => Days)
  m1: Days; 

  @Field(() => Days)
  m2: Days; 

  @Field(() => Days)
  m3: Days; 

  @Field(() => Days)
  m4: Days; 

  @Field(() => Days)
  m5: Days; 

  @Field(() => Days)
  m6: Days; 

  @Field(() => Days)
  m7: Days; 

  @Field(() => Days)
  m8: Days; 

  @Field(() => Days)
  m9: Days; 

  @Field(() => Days)
  m10: Days; 

  @Field(() => Days)
  m11: Days; 
}
