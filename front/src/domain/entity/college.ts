export type College = {
  name: string; // 大学名
  faculty: string; // 学部
  department: string; // 学科
};

export type Colleges = {
  search: string;
  result: CollegeResult[];
};

export type CollegeResult = {
  name: string;
  faculty: Faculty[];
};

export type Faculty = {
  name: string;
  department: string[];
};
