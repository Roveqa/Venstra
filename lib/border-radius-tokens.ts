export type BorderRadiusRow = {
  name: string;
  valuePx: number;
};

export const borderRadiusRows: BorderRadiusRow[] = [
  { name: "none", valuePx: 0 },
  { name: "s", valuePx: 4 },
  { name: "sm", valuePx: 6 },
  { name: "md", valuePx: 8 },
  { name: "l", valuePx: 10 },
  { name: "xl", valuePx: 12 },
  { name: "xxl", valuePx: 16 },
  { name: "xxxl", valuePx: 20 },
  { name: "xxxxl", valuePx: 24 },
  { name: "full", valuePx: 9999 },
];
