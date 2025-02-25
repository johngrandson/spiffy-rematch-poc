import { when } from "@/lib/when";

export const questionsLogics = [
  when(["questions/loadQuestions", "questions/hideQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "fetching", value: true },
    });
  }),
  when(["questions/setQuestions", "questions/clearQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "fetching", value: false },
    });
  }),
  when(["questions/saveQuestion"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "saving", value: true },
    });
  }),
  when(["questions/addQuestion", "questions/clearQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "saving", value: false },
    });
  }),
];
