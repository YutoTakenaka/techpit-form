import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Colleges } from "../../domain/entity/college";
import { collegeActions } from "./action";

const initialCollege: Colleges = { search: "" };

export const collegesReducer = reducerWithInitialState(initialCollege).case(
  collegeActions.setSearchWord,
  (state, payload) => ({ ...state, search: payload })
);
