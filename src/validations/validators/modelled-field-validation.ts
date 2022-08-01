import { Validation } from '@/presentation/protocols';
import { InvalidParamError } from '@/presentation/errors';

export class ModelledFieldValidation implements Validation {
  constructor(private readonly fieldName: string, private readonly subFields: string[]) {}

  validate(input: any): Error | undefined {
    const fieldValue = input[this.fieldName];
    if (!Array.isArray(fieldValue)) {
      return new InvalidParamError(this.fieldName);
    }
    for (const field of fieldValue) {
      const subFieldsKeys = Object.keys(field);
      if (!subFieldsKeys.some((subFieldKey) => this.subFields.includes(subFieldKey))) {
        return new InvalidParamError(this.fieldName);
      }
    }
  }
}
