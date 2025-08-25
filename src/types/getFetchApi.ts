export interface FetchApiOptions<T = unknown> {
  method: string;
  data?: T;
  headers?: Record<string, string>;
}