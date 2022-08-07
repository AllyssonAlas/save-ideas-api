import { MissingParamError } from '@/presentation/errors';
import { RelatedRequiredFieldsValidation } from '@/validations/validators';

const makeSut = (): RelatedRequiredFieldsValidation => {
  return new RelatedRequiredFieldsValidation([
    'relatedFieldOne',
    'relatedFieldTwo',
    'relatedFieldThree',
  ]);
};

describe('RelatedRequiredFieldsValidation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();

    const error = sut.validate({
      relatedFieldOne: 'any_value',
      relatedFieldThree: 'any_value',
    });

    expect(error).toEqual(new MissingParamError('relatedFieldTwo'));
  });
});
