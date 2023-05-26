import { Field, ID, InputType, PartialType } from "@nestjs/graphql";
import { CreateMealAdditionInput } from "./create-meal-addition.input";

@InputType()
export class UpdateMealObject extends PartialType(CreateMealAdditionInput) {
    @Field(()=> ID)
    id: string;

    @Field(()=> ID)
    _id: string;
}