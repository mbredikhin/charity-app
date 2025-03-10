import { Pagination } from '@/types';
import { useEffect, useState } from 'react';

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
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      throw error;
    }
  }

  return [sendRequest, loading, error as Error];
}

export function createAsyncAction<
  S extends { data?: any; loading: boolean; error: Error | null },
  P extends any[],
  D extends Partial<S['data']>,
  M extends (data: S['data']) => D,
  R extends D | M,
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
        const mutation: M = (
          typeof result === 'function'
            ? result
            : (data: S['data']) => ({ ...data, ...result })
        ) as M;
        if (typeof result !== 'undefined') {
          state.data = mutation(state.data);
        }
        state.loading = false;
      });
      return result;
    } catch (error) {
      set((state) => {
        state.loading = false;
        state.error = error as Error;
      });
      throw error;
    }
  }

  return wrappedAction;
}

export function usePagination<T extends any>(
  data: T[],
  limit = 3
): [T[], Pagination, (page: number) => void, () => void, () => void] {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    from: 1,
    to: limit,
    total: data.length,
    pagesCount: Math.ceil(data.length / limit),
  });
  const [currentPageData, setCurrentPageData] = useState<T[]>([]);

  function goToPage(page: number) {
    setPagination((pagination) => ({
      ...pagination,
      page,
      from: (page - 1) * limit + 1,
      to: page * limit,
    }));
  }

  function goToPrevPage() {
    if (pagination.page > 1) {
      goToPage(pagination.page - 1);
    }
  }

  function goToNextPage() {
    if (pagination.page <= pagination.pagesCount) {
      goToPage(pagination.page + 1);
    }
  }

  useEffect(() => {
    setCurrentPageData(data.slice(pagination.from - 1, pagination.to));
  }, [data, pagination]);

  useEffect(() => {
    setPagination({
      ...pagination,
      total: data.length,
      pagesCount: Math.ceil(data.length / limit),
    });
  }, [data.length, limit]);

  return [currentPageData, pagination, goToPage, goToPrevPage, goToNextPage];
}
