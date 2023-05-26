import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Meal } from "./meal.entity";

@ObjectType()
export class MealsResponse {

    @Field(()=> [Meal])
    data: Meal[];

    @Field(()=> Int)
    pages: number
}