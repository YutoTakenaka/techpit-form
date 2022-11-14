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
      faculty: facultyValidation(profile.college),
    },
    careers: careerValidation(profile.careers),
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

const careerValidation = (careers: Career[]) =>
  careers.map((career) => ({
    company: emptyValidation(career.company, PROFILE.CAREERS.COMPANY),
    position: emptyValidation(career.position, PROFILE.CAREERS.POSITION),
    startAt: emptyValidation(career.startAt, PROFILE.CAREERS.START_AT),
    endAt: emptyValidation(career.endAt, PROFILE.CAREERS.END_AT),
  }));

const facultyValidation = (college: College) =>
  college.name && college.faculty
    ? ""
    : `${PROFILE.COLLEGE.FACULTY}を入力してください`;

export const isValid = (message: Validation) => {
  const flattenValues = Object.values(message)
    .map(extractValues)
    .flat() as string[];
  return flattenValues.every((flattenValue) => !flattenValue);
};

const extractValues = (object: any): any[] | string => {
  if (typeof object === "string") return object;
  return Object.values(object).map(extractValues);
};
