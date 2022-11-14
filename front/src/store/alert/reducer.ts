import { reducerWithInitialState } from "typescript-fsa-reducers";
import { AlertState } from "../../domain/entity/alert";
import { alertActions } from "./actions";

const initialAlert: AlertState = {
  open: false,
  message: "",
  severity: "error",
};

export const alertReducer = reducerWithInitialState(initialAlert)
  .case(alertActions.openAlert, (_state, payload) => ({
    ...payload,
    open: true,
  }))
  .case(alertActions.closeAlert, (state) => ({
    ...state,
    message: "",
    open: false,
  }));
