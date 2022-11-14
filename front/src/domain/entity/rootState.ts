import { AlertState } from "./alert";
import { Colleges } from "./college";
import { Profile } from "./profile";
import { ValidationState } from "./validation";

// store のデータ構造がどのようなものになっているのかを定義
export type RootState = {
  profile: Profile;
  college: Colleges;
  validation: ValidationState;
  alert: AlertState;
};
