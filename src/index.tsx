import { useCallback, useEffect, useState } from "react";
import qs, { IParseOptions } from "qs";
import { getBaseUrl, qsOptions } from "./util";

export type UseWindowStateProps<T> = {
  initialState: T | any;
  options?: Partial<IParseOptions>;
};

export default function useWindowState<T>({
  initialState = {},
  options = {},
}: UseWindowStateProps<T>) {
  const state = qs.parse(window.location.search, {
    ...qsOptions,
    ...options,
  });
  const [_forceUpdate, setForceUpdate] = useState(0);
  useEffect(() => {
    const querystring = qs.stringify({ ...initialState, ...state });
    const nextUrl = `${getBaseUrl()}?${querystring}`;
    window.history.pushState({ path: nextUrl }, "", nextUrl);
    setForceUpdate((prevValue) => prevValue + 1);
  }, []);

  const update = useCallback((values: Partial<T>) => {
    const existing = qs.parse(window.location.search, qsOptions);
    const querystring = qs.stringify({ ...existing, ...values });
    const nextUrl = `${getBaseUrl()}?${querystring}`;
    window.history.pushState({ path: nextUrl }, "", nextUrl);
    setForceUpdate((prevValue) => prevValue + 1);
  }, []);
  return {
    update,
    state: state as T,
  };
}
