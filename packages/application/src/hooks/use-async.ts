import { useState, useCallback } from "react";
import type { Result } from "@synth-video/core";

type AsyncState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: Error };

export function useAsync<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<Result<T>>
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const execute = useCallback(
    async (...args: Args) => {
      setState({ status: "loading", data: null, error: null });

      const result = await asyncFn(...args);

      if (result.success) {
        setState({ status: "success", data: result.data, error: null });
        return result;
      } else {
        setState({
          status: "error",
          data: null,
          error: result.error instanceof Error ? result.error : new Error(String(result.error)),
        });
        return result;
      }
    },
    [asyncFn]
  );

  const reset = useCallback(() => {
    setState({ status: "idle", data: null, error: null });
  }, []);

  return {
    ...state,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    execute,
    reset,
  };
}
