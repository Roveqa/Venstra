export type TokenRow = { name: string; value: string };
export type TokenGroup = { title: string; rows: TokenRow[] };

export const primitiveTypographyGroups: TokenGroup[] = [
  {
    title: "Font Family",
    rows: [{ name: "inter", value: "Inter" }],
  },
  {
    title: "Font Size",
    rows: [
      { name: "size-xs", value: "10px" },
      { name: "size-sm", value: "12px" },
      { name: "size-md", value: "14px" },
      { name: "size-lg", value: "16px" },
      { name: "size-xl", value: "20px" },
      { name: "size-2xl", value: "24px" },
      { name: "size-3xl", value: "32px" },
      { name: "size-4xl", value: "40px" },
      { name: "size-5xl", value: "48px" },
      { name: "size-6xl", value: "56px" },
      { name: "size-7xl", value: "64px" },
    ],
  },
  {
    title: "Line Height",
    rows: [
      { name: "line-height-xs", value: "116%" },
      { name: "line-height-sm", value: "120%" },
      { name: "line-height-md", value: "124%" },
      { name: "line-height-lg", value: "128%" },
      { name: "line-height-xl", value: "140%" },
    ],
  },
  {
    title: "Letter Spacing",
    rows: [
      { name: "letter-spacing-default", value: "-1%" },
      { name: "letter-spacing-tight", value: "-2%" },
    ],
  },
];
