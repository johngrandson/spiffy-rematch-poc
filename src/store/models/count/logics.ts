import { when } from "@/lib/when";
import { RootState } from "@/store";

export const countLogics = [
  when<RootState, Record<string, unknown>>(
    ["count/incrementAsync"],
    (dispatch, { rootState }) => {
      if (rootState.count.loadings.fetching) return;

      dispatch({
        type: "count/setLoading",
        payload: { type: "fetching", value: true },
      });
    }
  ),
  when<RootState, Record<string, unknown>>(["count/increment"], (dispatch) => {
    dispatch({
      type: "count/setLoading",
      payload: { type: "fetching", value: false },
    });
  }),
  when<RootState, Record<string, unknown>>(
    ["count/setError"],
    (dispatch, { rootState }) => {
      alert("Error: " + rootState.count.errors.fetching);
      dispatch({
        type: "count/setLoading",
        payload: { type: "fetching", value: false },
      });
    }
  ),
  when<RootState, Record<string, unknown>>(
    ["count/decrementAsync"],
    (dispatch, { rootState }) => {
      if (rootState.count.loadings.fetching) return;

      dispatch({
        type: "count/setLoading",
        payload: { type: "fetching", value: true },
      });
    }
  ),
  when<RootState, Record<string, unknown>>(["count/decrement"], (dispatch) => {
    dispatch({
      type: "count/setLoading",
      payload: { type: "fetching", value: false },
    });
  }),
  when<RootState, Record<string, unknown>>(["count/resetAsync"], (dispatch) => {
    dispatch({
      type: "count/setLoading",
      payload: { type: "fetching", value: true },
    });
  }),
  when<RootState, Record<string, unknown>>(["count/reset"], (dispatch) => {
    dispatch({
      type: "count/setLoading",
      payload: { type: "fetching", value: false },
    });
  }),
];
