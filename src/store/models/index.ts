import { Models } from "@rematch/core";

import { count } from "./count";
import { questions } from "./questions";

export interface RootModel extends Models<RootModel> {
  count: typeof count;
  questions: typeof questions;
}

const models: RootModel = { count, questions };

export default models;
