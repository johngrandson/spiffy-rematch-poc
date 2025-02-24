import { createSelector } from "reselect";

import { RootState } from "@/store";
import { CountState } from "@/store/models/count";

const selectCountState = (state: RootState) => state.count;

// A memoized selector that extracts the count value.
const selectValue = createSelector(
  [selectCountState],
  (countState: CountState) => countState.value
);

// A memoized selector that extracts the count value.
const selectLoadings = createSelector(
  [selectCountState],
  (countState: CountState) => countState.loadings
);

export const valueSelector = createSelector(
  [selectValue, selectLoadings],
  (value, loadings) => ({
    value,
    loadings,
  })
);
