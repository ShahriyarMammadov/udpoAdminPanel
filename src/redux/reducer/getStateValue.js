export default function getTextEditorValueReducer(state = "", action) {
  switch (action.type) {
    case "GETVALUE":
      return action.payload;

    default:
      return state;
  }
}
