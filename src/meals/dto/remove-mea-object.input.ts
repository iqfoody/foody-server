import { Field, ID, InputType } from "@nestjs/graphql";

@InputType()
export class RemoveMealObject {
    @Field(()=> ID)
    id: string;

    @Field(()=> ID, {nullable: true})
    addition?: string;

    @Field(()=> ID, {nullable: true})
    ingredient?: string;
}