import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";
import { Career } from "../../domain/entity/career";
import { College } from "../../domain/entity/college";

const actionCreator = actionCreatorFactory();

export const profileActions = {
  // Partial<T>はTという型の部分集合という意味=一部分だけ受け取っている
  setProfile: actionCreator<Partial<Profile>>("SET_PROFILE"),
  setAddress: actionCreator<Partial<Address>>("SET_ADDRESS"),

  // 非同期処理用のstart、done、failの 3 つの action を作成
  // 今回の場合、start={}, done=Partial, fail={}となっている
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>(
    "SEARCH_ADDRESS"
  ),

  setCareer: actionCreator<{ career: Partial<Career>; index: number }>(
    "SET_CAREER"
  ),
  deleteCareer: actionCreator<number>("DELETE_CAREER"),
  addCareer: actionCreator<{}>("ADD_CAREER"),

  setCollege: actionCreator<Partial<College>>("SET_COLLEGE"),
};
