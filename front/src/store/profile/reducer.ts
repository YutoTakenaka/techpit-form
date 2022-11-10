import { profileActions } from "./actions";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import { profile } from "console";

// 初期値の指定
const initial: Profile = {
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
};

export const profileReducer = reducerWithInitialState(initial)
  .case(profileActions.setProfile, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload },
    //         これまでのステート,新しいステート
    // addressのみを更新している
  }));
