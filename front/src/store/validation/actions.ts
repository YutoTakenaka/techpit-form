import { Validation } from "./../../domain/entity/validation";
import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const validationActions = {
  setIsStartValidation: actionCreator<boolean>("SET_IS_START_VALIDATION"),
  setValidation: actionCreator<Validation>("SET_VALIDATION"),
};
