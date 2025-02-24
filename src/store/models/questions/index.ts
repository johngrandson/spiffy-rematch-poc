import { createModel } from "@rematch/core";
import { RootModel } from "..";

export type QuestionsState = {
  questions: number[];
  amount: number;
  loadings: {
    fetching: boolean;
    saving: boolean;
  };
  errors: {
    fetching: string | null;
    saving: string | null;
  };
};

export const questions = createModel<RootModel>()({
  state: {
    questions: [],
    amount: 2,
    loadings: {
      fetching: false,
      saving: false,
    },
    errors: {
      fetching: null,
      saving: null,
    },
  } as QuestionsState,

  reducers: {
    setLoading(
      state,
      {
        type,
        value,
      }: { type: keyof QuestionsState["loadings"]; value: boolean }
    ) {
      return { ...state, loadings: { ...state.loadings, [type]: value } };
    },
    setError(
      state,
      {
        type,
        value,
      }: { type: keyof QuestionsState["errors"]; value: string | null }
    ) {
      return { ...state, errors: { ...state.errors, [type]: value } };
    },
    setQuestions(state, payload: number[]) {
      return {
        ...state,
        questions: Array.from(new Set([...state.questions, ...payload])),
      };
    },
    addQuestion(state, payload: number) {
      if (state.questions.includes(payload)) return state;
      return { ...state, questions: [...state.questions, payload] };
    },
    clearQuestions(state) {
      if (state.questions.length === 0) return state;
      return { ...state, questions: [] };
    },
  },

  effects: (dispatch) => ({
    async loadQuestions() {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // New payload from, e.g., an API call.
      const payload = [1, 2, 3, 4];

      // Call setQuestions with the new payload;
      // the reducer will merge it with existing ones and remove duplicates.
      dispatch.questions.setQuestions(payload);
    },
    async saveQuestion({ question }: { question: number }) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch.questions.addQuestion(question);
    },
    async hideQuestions() {
      await new Promise((resolve) => setTimeout(resolve, 500));
      dispatch.questions.clearQuestions();
    },
  }),
});
