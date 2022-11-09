import { profileActions } from "./actions";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";

const initial: Profile = {
  name: "",
  description: "",
  birthday: "",
  gender: "",
};

export const profileReducer = reducerWithInitialState(initial).case(
  profileActions.setProfile,
  (state, payload) => ({
    ...state,
    ...payload,
  })
);
