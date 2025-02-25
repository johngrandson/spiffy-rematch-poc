import { createLogic, Logic } from "redux-logic";

export interface AppAction<Payload = Record<string, unknown>> {
  type: string;
  payload: Payload;
  meta?: object;
  error?: false;
}

/**
 * A simplified callback type for the `when` helper.
 * The callback receives a dispatch function (which accepts a ReduxAction with payload Payload)
 * and a context containing the root state and the triggering action.
 */
export type WhenCallback<
  State extends object = Record<string, unknown>,
  Payload extends object = object
> = (
  dispatch: <T extends AppAction<Payload>>(action: T) => T,
  context: { rootState: State; action: AppAction<Payload> }
) => void;

/**
 * A simplified helper to create a Redux‑Logic object.
 *
 * This version uses generics for State and Payload (both constrained to object)
 * and uses a type assertion in the process function to satisfy TypeScript.
 *
 * @param actions - A single action type or an array of action types.
 * @param callback - A callback that receives a dispatch function and a context with the current state and action.
 * @param latest - If true, the callback is executed only when the action is the latest action.
 * @param debounce - The debounce time in milliseconds.
 * @returns A Redux‑Logic logic object.
 */
export function when<
  State extends object = Record<string, unknown>,
  Payload extends object = object
>(
  actions: string[],
  callback: WhenCallback<State, Payload>,
  { latest }: { latest?: boolean } = { latest: true },
  { debounce }: { debounce?: number } = { debounce: 0 }
): Logic<State, AppAction<Payload>, object, object, undefined, string> {
  return createLogic<
    State,
    AppAction<Payload>,
    object,
    object,
    undefined,
    string
  >({
    type: actions,
    latest: latest,
    debounce: debounce,
    process({ getState, action }, dispatch, done) {
      callback(dispatch, {
        rootState: getState(),
        action: action as AppAction<Payload>,
      });
      done();
    },
  });
}
