import { combineReducers } from "redux";
import getTextEditorValueReducer from "./getStateValue";

export const rootReducer = combineReducers({
  getTextEditorValueReducer,
});
