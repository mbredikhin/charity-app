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

export function createAsyncAction<
  S extends { data?: any; loading: boolean; error: Error | null },
  P extends any[],
  R extends Partial<S['data']>,
  A extends (...args: P) => Promise<R>,
>(
  set: (cb: (state: S) => void) => void,
  action: A
): (...args: P) => Promise<R> {
  async function wrappedAction(...args: P): Promise<R> {
    try {
      set((state) => {
        state.error = null;
        state.loading = true;
      });
      const result: R = await action(...args);
      set((state) => {
        if (result !== undefined) {
          state.data = { ...state.data, ...result };
        }
        state.loading = false;
      });
      return result;
    } catch (error) {
      set((state) => {
        state.loading = false;
        state.error = error;
      });
      throw error;
    }
  }

  return wrappedAction;
}
