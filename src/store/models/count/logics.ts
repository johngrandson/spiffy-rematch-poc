import { when } from "@/lib/when";
import { RootState } from "@/store";

export const countLogics = [
  when<RootState, Record<string, unknown>>(
    ["count/incrementAsync", "count/decrementAsync", "count/resetAsync"],
    (dispatch) => {
      dispatch({
        type: "count/setLoading",
        payload: { type: "fetching", value: true },
      });
    }
  ),
  when<RootState, Record<string, unknown>>(
    ["count/increment", "count/decrement", "count/reset", "count/setError"],
    (dispatch, { rootState }) => {
      if (rootState.count.errors.fetching) {
        alert("Error: " + rootState.count.errors.fetching);

        dispatch({
          type: "count/setError",
          payload: { type: "fetching", value: null },
        });
      }

      dispatch({
        type: "count/setLoading",
        payload: { type: "fetching", value: false },
      });
    },
    { latest: true },
    { debounce: 3000 }
  ),
];
