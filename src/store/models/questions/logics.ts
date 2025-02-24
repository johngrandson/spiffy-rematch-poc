import { when } from "@/lib/when";

export const questionsLogics = [
  when(["questions/loadQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "fetching", value: true },
    });
  }),
  when(["questions/setQuestions"], (dispatch) => {
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
  when(["questions/addQuestion"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "saving", value: false },
    });
  }),
  when(["questions/clearQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "saving", value: false },
    });
  }),
  when(["questions/hideQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "fetching", value: true },
    });
  }),
  when(["questions/clearQuestions"], (dispatch) => {
    dispatch({
      type: "questions/setLoading",
      payload: { type: "fetching", value: false },
    });
  }),
];
