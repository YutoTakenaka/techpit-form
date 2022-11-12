import { Career } from "../entity/career";

// careersに一個でも全て空の職歴がある場合は新しい職歴を追加できない
export const exitEmptyCareers = (careers: Career[]) =>
  careers.some((career) => isEmptyCareer(career));

const isEmptyCareer = (career: Career) => {
  return Object.values(career).every((value) => !value);
};
