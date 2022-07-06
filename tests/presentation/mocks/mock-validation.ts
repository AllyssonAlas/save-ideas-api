import { Validation } from '@/presentation/protocols';

export class ValidationSpy implements Validation {
  error: Error | null = null;
  callsCount = 0;
  input: any;

  validate(input: any): Error | null {
    this.input = input;
    this.callsCount++;
    return this.error;
  }
}
