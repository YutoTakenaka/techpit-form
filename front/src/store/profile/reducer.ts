import { profileActions } from "./actions";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { Profile } from "../../domain/entity/profile";
import { Career } from "../../domain/entity/career";

// 初期値の指定
const initial: Profile = {
  name: "",
  description: "",
  birthday: "",
  gender: "",
  address: {
    postalCode: "",
    prefecture: "",
    city: "",
    restAddress: "",
  },
  careers: [],
  college: {
    name: "",
    faculty: "",
    department: "",
  },
};

const initialCareer: Career = {
  company: "",
  position: "",
  startAt: "",
  endAt: "",
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
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result },
  }))
  .case(profileActions.setCareer, (state, payload) => ({
    ...state,
    careers: state.careers.map((career, i) =>
      i === payload.index ? { ...career, ...payload.career } : career
    ),
  }))
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    careers: state.careers.filter((_, i) => i !== payload),
  }))
  .case(profileActions.addCareer, (state) => ({
    ...state,
    careers: [...state.careers, initialCareer],
  }))
  .case(profileActions.setCollege, (state, payload) => ({
    ...state,
    college: { ...state.college, ...payload },
  }));
