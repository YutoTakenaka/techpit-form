import { ValidationState } from "../../domain/entity/validation";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { validationActions } from "./actions";

const initialValidate: ValidationState = {
  isStartValidation: false,
  message: {
    name: "",
    description: "",
    birthday: "",
    gender: "",
    address: {
      postalcode: "",
      prefecture: "",
      city: "",
      restAddress: "",
    },
    college: {
      faculty: "",
    },
    careers: [],
  },
};

export const validationReducer = reducerWithInitialState(initialValidate)
  .case(validationActions.setIsStartValidation, (state, payload) => ({
    ...state,
    isStartValidation: payload,
  }))
  .case(validationActions.setValidation, (state, payload) => ({
    ...state,
    message: payload,
  }));
