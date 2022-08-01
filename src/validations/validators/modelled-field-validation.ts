import { Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class ModelledFieldValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly subFields: string[]) {}

  validate(input: any): Error | undefined {
    if (!Array.isArray(input[this.fieldName])) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
