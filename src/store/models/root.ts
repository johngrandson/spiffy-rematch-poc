// selectors/root.ts
import { createSelector } from "reselect";
import { RootState } from "@/store";

/**
 * Memoized selector that returns the entire state.
 *
 * NOTE: Returning the entire state will trigger a re-render
 * whenever any part of the state changes. This is useful
 * for debugging purposes (like in a StateViewer component),
 * but should be avoided in production components.
 */
export const selectEntireState = createSelector(
  (state: RootState) => state,
  (rootState) => rootState
);
