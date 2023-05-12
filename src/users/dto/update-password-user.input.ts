import { InputType, PartialType } from '@nestjs/graphql';
import { PasswordUserInput } from './password-user.input';

@InputType()
export class UpdatePasswordUser extends PartialType(PasswordUserInput){
  
}
