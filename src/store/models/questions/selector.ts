import { createSelector } from "reselect";

import { RootState } from "@/store";
import { QuestionsState } from "@/store/models/questions";

const selectQuestionsState = (state: RootState) => state.questions;

// A memoized selector that extracts the questions array.
const selectQuestions = createSelector(
  [selectQuestionsState],
  (questionsState: QuestionsState) => questionsState.questions
);

// A memoized selector that extracts the loadings.
const selectLoadings = createSelector(
  [selectQuestionsState],
  (questionsState: QuestionsState) => questionsState.loadings
);

export const questionsSelector = createSelector(
  [selectQuestions, selectLoadings],
  (questions, loadings) => ({
    questions,
    loadings,
  })
);
