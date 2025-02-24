/* eslint-disable @typescript-eslint/no-explicit-any */
import { init, RematchRootState } from "@rematch/core";
import { createLogicMiddleware, Logic } from "redux-logic";

import models, { RootModel } from "@/store/models";
import { countLogics } from "@/store/models/count/logics";
import { questionsLogics } from "@/store/models/questions/logics";

type AppLogic = Logic<
  Record<string, unknown>,
  any,
  any,
  object,
  undefined,
  string
>;

const combinedLogics = [...countLogics, ...questionsLogics] as AppLogic[];
const logicMiddleware = createLogicMiddleware(combinedLogics);

export const store = init<RootModel>({
  models,
  redux: {
    middlewares: [logicMiddleware],
    devtoolOptions: {
      actionSanitizer: (action) => action,
    },
  },
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchRootState<RootModel>;
