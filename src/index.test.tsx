import useWindowState from ".";
import { renderHook, act } from "@testing-library/react-hooks";

it("Should insert the initial values into the url", async () => {
  expect(window.location.search).toBe("");
  const { result } = renderHook(() =>
    useWindowState({ initialState: { limit: 0, offset: 0 } })
  );
  expect(window.location.search).toBe("?limit=0&offset=0");
  expect(result.current.state).toEqual({ limit: 0, offset: 0 });
});

it("Should insert the initial values while preserving any existing values", () => {
  window.history.pushState({ path: "/?test=test" }, "", "/?test=test");
  const { result } = renderHook(() =>
    useWindowState({ initialState: { limit: 0, offset: 0 } })
  );
  expect(window.location.search).toBe("?limit=0&offset=0&test=test");
  expect(result.current.state).toEqual({ limit: 0, offset: 0, test: "test" });
});

it("Should update a value into the url", () => {
  const valueToTest = {
    test: {
      test: {
        test: {
          test: "t",
        },
      },
    },
  };

  window.history.pushState({ path: "/?test=test" }, "", "/?test=test");
  const { result } = renderHook(() =>
    useWindowState({ initialState: { limit: 0, offset: 0 } })
  );

  act(() => {
    result.current.update({ newValue: valueToTest });
  });

  expect(result.current.state).toEqual({
    limit: 0,
    offset: 0,
    test: "test",
    newValue: valueToTest,
  });
});
