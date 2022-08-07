import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class RelatedRequiredFieldsValidation implements Validation {
  constructor(private readonly relatedFields: string[]) {}

  validate(input: any): Error | undefined {
    const inputFields = Object.keys(input);
    const findRelatedField = this.relatedFields.find((relatedField) =>
      inputFields.includes(relatedField),
    );
    if (findRelatedField) {
      const findMissingRelatedField = this.relatedFields.find(
        (relatedField) => !inputFields.includes(relatedField),
      );

      if (findMissingRelatedField) {
        return new MissingParamError(findMissingRelatedField);
      }
    }
  }
}
