export const isPostalCode = (target: string) =>
  /^(\d{0,7}|\d{0,3}|\d{3}-\d{4})$/.test(target);

export const isCompletePostalCode = (target: string) =>
  /^(\d{7}|\d{3}-\s{4})$/.test(target);

export const sanitizePostalCode = (target: string) => target.replace(/-/, "");
