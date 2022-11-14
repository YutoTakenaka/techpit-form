import { Profile } from "../entity/profile";
import { Validation } from "../entity/validation";
import { PROFILE } from "./profile";
import { College } from "../entity/college";
import { Career } from "../entity/career";

export const calculateValidation = (profile: Profile) => {
  const message: Validation = {
    name: emptyValidation(profile.name, PROFILE.NAME),
    description: lengthValidation(profile.description, 1000),
    birthday: emptyValidation(profile.birthday, PROFILE.BIRTHDAY),
    gender: emptyValidation(profile.gender, PROFILE.GENDER),
    address: {
      postalcode: emptyValidation(
        profile.address.postalCode,
        PROFILE.ADDRESS.POSTAL_CODE
      ),
      prefecture: emptyValidation(
        profile.address.prefecture,
        PROFILE.ADDRESS.PREFECTURE
      ),
      city: emptyValidation(profile.address.city, PROFILE.ADDRESS.CITY),
      restAddress: emptyValidation(
        profile.address.restAddress,
        PROFILE.ADDRESS.RESTARRESS
      ),
    },
    college: {
      faculty: "",
    },
    careers: [],
  };

  return message;
};

const isEmpty = (str: string) => !str.trim();

const isTooLong = (str: string, maxLen: number) => str.trim().length >= maxLen;

// 文字数制限
const lengthValidation = (target: string, maxLen: number) =>
  isTooLong(target, maxLen) ? `${maxLen}文字以下で入力してください。` : "";

// 必須項目
const emptyValidation = (target: string, col: string) =>
  isEmpty(target) ? `${col}を入力してください。` : "";
