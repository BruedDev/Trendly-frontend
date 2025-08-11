export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type RequestConfig<TBody = unknown, TParams = Record<string, string | number>> = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: TBody;
  params?: TParams;
};
