import { collegesReducer } from "./colleges/reducer";
import { profileReducer } from "./profile/reducer";
import { RootState } from "./../domain/entity/rootState";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { validationReducer } from "./validation/reducer";
import { alertReducer } from "./alert/reducer";

export const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
    college: collegesReducer,
    validation: validationReducer,
    alert: alertReducer,
  }),
  compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);
