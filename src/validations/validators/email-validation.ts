import { EmailValidator } from '@/validations/protocols';
import { Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  validate(input: any): Error | undefined {
    const isEmailValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isEmailValid) return new InvalidParamError('email');
  }
}
