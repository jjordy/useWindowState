import { useCallback, useMemo, useState } from "react";
import qs from "qs";

export type UseWindowStateProps<T> = {
  initialState: T | any;
};

const qsOptions = {
  ignoreQueryPrefix: true,
  arrayFormat: "bracket",
  decoder(str: any, decoder: any, charset: any) {
    const strWithoutPlus = str.replace(/\+/g, " ");
    if (charset === "iso-8859-1") {
      // unescape never throws, no try...catch needed:
      return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }

    if (/^(\d+|\d*\.\d+)$/.test(str)) {
      return parseFloat(str);
    }

    const keywords = {
      true: true,
      false: false,
      null: null,
      undefined,
    };
    if (str in keywords) {
      return keywords[str];
    }

    // utf-8
    try {
      return decodeURIComponent(strWithoutPlus);
    } catch (e) {
      return strWithoutPlus;
    }
  },
};

export default function useWindowState<T>({
  initialState = {},
}: UseWindowStateProps<T>) {
  const initialValues = useMemo(() => {
    const windowData = qs.parse(window.location.search, qsOptions);
    return { ...initialState, ...windowData };
  }, [initialState]);
  const [state, setState] = useState<T>(initialValues);

  const update = useCallback((values: Partial<T>) => {
    setState((prevState) => {
      const url =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname;
      const querystring = qs.stringify({ ...prevState, ...values });
      const nextUrl = `${url}?${querystring}`;
      window.history.pushState({ path: nextUrl }, "", nextUrl);
      return {
        ...prevState,
        ...values,
      };
    });
  }, []);
  return {
    update,
    state,
  };
}
