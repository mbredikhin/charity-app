import { useState } from 'react';

export function useRequest<
  T extends (...args: any) => Promise<any>,
  P extends Parameters<T>,
  R extends Awaited<ReturnType<T>>,
>(request: T): [(...args: P) => Promise<R>, boolean, Error] {
  const [error, setError] = useState<null | Error>(null);
  const [loading, setLoading] = useState(false);

  async function sendRequest(...args: P) {
    try {
      setError(null);
      setLoading(true);
      const result: R = await request(...args);
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      setError(err);
      throw err;
    }
  }

  return [sendRequest, loading, error];
}
