export type ApiResponseType<T> = {
  STATUS: 'OK' | 'ERROR';
  DATA: T;
  MSG: string;
}
