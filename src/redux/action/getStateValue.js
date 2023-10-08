export const getTextEditorValue = (text) => {
  return async (dispatch) => {
    dispatch({
      type: "GETVALUE",
      payload: text,
    });
  };
};
