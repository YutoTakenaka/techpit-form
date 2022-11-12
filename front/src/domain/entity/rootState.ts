import { Colleges } from "./college";
import { Profile } from "./profile";

// store のデータ構造がどのようなものになっているのかを定義
export type RootState = {
  profile: Profile;
  college: Colleges;
};
