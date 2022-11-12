import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory();

export const collegeActions = {
  setSearchWord: actionCreator<string>("SET_SEARCH_WORD"),
};
