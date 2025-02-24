/* eslint-disable @typescript-eslint/no-explicit-any */
import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type CountState = {
  value: number;
  loadings: {
    fetching: boolean;
    saving: boolean;
  };
  errors: {
    fetching: string | null;
    saving: string | null;
  };
};

interface SetLoadingPayload {
  type: keyof CountState["loadings"];
  value: boolean;
}

interface SetErrorPayload {
  type: keyof CountState["errors"];
  value: string | null;
}

export const count = createModel<RootModel>()({
  state: {
    value: 0,
    loadings: {
      fetching: false,
      saving: false,
    },
    errors: {
      fetching: null,
      saving: null,
    },
  } as CountState,

  reducers: {
    setLoading(state: CountState, payload: SetLoadingPayload) {
      return {
        ...state,
        loadings: { ...state.loadings, [payload.type]: payload.value },
      };
    },
    setError(state: CountState, payload: SetErrorPayload) {
      return {
        ...state,
        errors: { ...state.errors, [payload.type]: payload.value },
      };
    },
    increment(state: CountState, payload: number) {
      return { ...state, value: state.value + payload };
    },
    decrement(state: CountState) {
      return { ...state, value: state.value - 1 };
    },
    reset(state: CountState) {
      return { ...state, value: 0 };
    },
  },

  effects: (dispatch) => ({
    async incrementAsync(): Promise<void> {
      try {
        const response = await fetch("/api/random");
        const [value] = await response.json();

        if (value > 5) {
          throw new Error("Value is greater than 5");
        }

        dispatch.count.increment(value);
      } catch (error: any) {
        dispatch.count.setError({
          type: "fetching",
          value: error.message || "Error fetching data",
        });
      }
    },
    async decrementAsync(): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      dispatch.count.decrement();
    },
    async resetAsync(): Promise<void> {
      await new Promise((resolve) => setTimeout(resolve, 2500));
      dispatch.count.reset();
    },
  }),
});
