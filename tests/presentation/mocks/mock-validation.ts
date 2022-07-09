import { Validation } from '@/presentation/protocols';

export class ValidationSpy implements Validation {
  error: Error | undefined = undefined;
  callsCount = 0;
  input: any;

  validate(input: any): Error | undefined {
    this.input = input;
    this.callsCount++;
    return this.error;
  }
}
