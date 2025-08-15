import { client } from '../../sanity/lib';

/**
 * Utility helpers for fetching Sanity documents by type or custom GROQ.
 * - fetchByType<T>(type) -> fetch all documents of given _type
 * - fetchOneByType<T>(type, params) -> fetch single document (first) matching params
 * - runGroq<T>(query, params) -> run a raw GROQ query
 */
export async function fetchByType<T = unknown>(type: string): Promise<T[]> {
  const query = `*[_type == $type]`;
  return client.fetch<T[]>(query, { type } as any);
}

export async function fetchOneByType<T = unknown>(
  type: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  const query = `*[_type == $type && ${Object.keys(params)
    .map((k) => `${k} == $${k}`)
    .join(' && ')}][0]`;

  if (Object.keys(params).length === 0) {
    // return first document of this type
  return client.fetch<T | null>(`*[_type == $type][0]`, { type } as any);
  }

  return client.fetch<T | null>(query, { type, ...params } as any);
}

export async function runGroq<T = unknown>(query: string, params?: Record<string, unknown>) {
  return client.fetch<T>(query, params as any);
}
