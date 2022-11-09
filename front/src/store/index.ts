import { profileReducer } from "./profile/reducer";
import { RootState } from "./../domain/entity/rootState";
import { combineReducers, createStore } from "redux";

export const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
  }),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
