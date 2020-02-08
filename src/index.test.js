import { usePersistState } from "./";
import { renderHook, act } from "@testing-library/react-hooks";

// mock timer using jest
jest.useFakeTimers();

describe("usePersistState", () => {
  it("Persist state after page refresh", () => {
    const { result } = renderHook(() => usePersistState(5, "my-counter"));
    expect(result.current[0]).toBe(5);

    const storedResult = renderHook(() => usePersistState(10, "my-counter"));
    expect(storedResult.result.current[0]).toBe(5);
  });
});
