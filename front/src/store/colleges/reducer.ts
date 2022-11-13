import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Colleges } from "../../domain/entity/college";
import { collegeActions } from "./action";

const initialCollege: Colleges = { search: "", result: [] };

export const collegesReducer = reducerWithInitialState(initialCollege)
  .case(collegeActions.setSearchWord, (state, payload) => ({
    ...state,
    search: payload,
  }))
  .case(collegeActions.searchCollege.done, (state, payload) => ({
    ...state,
    result: payload.result,
  }));
