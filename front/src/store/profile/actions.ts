import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../../domain/entity/profile";
import { Address } from "../../domain/entity/address";

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
};
