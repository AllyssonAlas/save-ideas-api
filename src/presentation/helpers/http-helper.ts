import { HttpResponse } from '@/presentation/protocols';
import { ServerError } from '@/presentation/errors';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});
