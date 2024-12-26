"use client";

import { useEffect, useState } from "react";

interface UseFetchProps<ResultType> {
  enabled?: boolean;
  initialData?: ResultType;
  fetchFn: () => Promise<ResultType>;
  onError?: (error: unknown) => void;
  deps?: unknown[];
}

export const useFetch = <ResultType>({
  enabled = true,
  initialData = undefined,
  fetchFn,
  onError,
  deps = [],
}: UseFetchProps<ResultType>) => {
  const [fetchResult, setFetchResult] = useState<ResultType | undefined>(
    initialData,
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    (async function () {
      try {
        const resultData = await fetchFn();
        setFetchResult(resultData);
      } catch (error) {
        if (onError) {
          onError(error);
          return;
        }
        throw error;
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);

  return fetchResult === undefined
    ? ({ data: undefined, isLoading: true } as const)
    : ({ data: fetchResult, isLoading: false } as const);
};
