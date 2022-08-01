import { ModelledFieldValidation } from '@/validations/validators';
import { InvalidParamError } from '@/presentation/errors';

const makeSut = (): ModelledFieldValidation => {
  return new ModelledFieldValidation('field', ['subfieldOne']);
};

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if field is not an array', () => {
    const sut = makeSut();

    const error = sut.validate({ field: 'any_value' });

    expect(error).toEqual(new InvalidParamError('field'));
  });

  test('Should return an InvalidParamError if subfields are incorrect', () => {
    const sut = makeSut();

    const error = sut.validate({
      field: [{ wrongSubField: 'any_value' }],
      subfields: ['wrongSubField'],
    });

    expect(error).toEqual(new InvalidParamError('field'));
  });
});
