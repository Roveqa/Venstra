import { primitiveTypographyGroups } from "./typography-tokens";

export type SemanticTypographyRow = {
  name: string;
  fontSizeKey: string;
  fontWeightLabel: "Semi Bold" | "Medium" | "Regular" | "Italic";
  lineHeightKey: string;
  letterSpacingKey: string;
  underline?: boolean;
};

function lookup(groupTitle: string, name: string): string {
  const group = primitiveTypographyGroups.find((g) => g.title === groupTitle);
  const row = group?.rows.find((r) => r.name === name);
  return row?.value ?? "";
}

export function resolveFontSize(key: string) {
  return lookup("Font Size", key); // e.g. "16px"
}

export function resolveLineHeight(key: string) {
  return lookup("Line Height", key); // e.g. "128%"
}

export function resolveLetterSpacing(key: string) {
  return lookup("Letter Spacing", key); // e.g. "-1%"
}

const weightMap: Record<SemanticTypographyRow["fontWeightLabel"], number> = {
  "Semi Bold": 600,
  Medium: 500,
  Regular: 400,
  Italic: 400,
};

export function previewStyle(row: SemanticTypographyRow): React.CSSProperties {
  const fontSizePx = parseFloat(resolveFontSize(row.fontSizeKey));
  const letterSpacingPct = parseFloat(resolveLetterSpacing(row.letterSpacingKey));
  return {
    fontSize: `${fontSizePx}px`,
    fontWeight: weightMap[row.fontWeightLabel],
    lineHeight: resolveLineHeight(row.lineHeightKey),
    letterSpacing: `${(letterSpacingPct / 100) * fontSizePx}px`,
    fontStyle: row.fontWeightLabel === "Italic" ? "italic" : "normal",
    textDecoration: row.underline ? "underline" : "none",
  };
}

export const semanticTypographyRows: SemanticTypographyRow[] = [
  {
    name: "Display/Large",
    fontSizeKey: "size-7xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-lg",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Display/Medium",
    fontSizeKey: "size-6xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-lg",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Display/Small",
    fontSizeKey: "size-5xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Heading/Large",
    fontSizeKey: "size-4xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-sm",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Heading/Medium",
    fontSizeKey: "size-3xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-md",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Heading/Small",
    fontSizeKey: "size-2xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Heading/XSmall",
    fontSizeKey: "size-xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-sm",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Title/Large",
    fontSizeKey: "size-xl",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Title/Medium",
    fontSizeKey: "size-lg",
    fontWeightLabel: "Medium",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Body/Large",
    fontSizeKey: "size-lg",
    fontWeightLabel: "Regular",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Body/Medium",
    fontSizeKey: "size-md",
    fontWeightLabel: "Regular",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Body/Medium-SemiBold",
    fontSizeKey: "size-md",
    fontWeightLabel: "Semi Bold",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Body/Medium-Compact",
    fontSizeKey: "size-md",
    fontWeightLabel: "Regular",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Body/Medium-Italic",
    fontSizeKey: "size-md",
    fontWeightLabel: "Italic",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Body/Small",
    fontSizeKey: "size-sm",
    fontWeightLabel: "Regular",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Label/Large",
    fontSizeKey: "size-md",
    fontWeightLabel: "Medium",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Label/Large-Underline",
    fontSizeKey: "size-md",
    fontWeightLabel: "Medium",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
    underline: true,
  },
  {
    name: "Label/Large-Compact",
    fontSizeKey: "size-md",
    fontWeightLabel: "Medium",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Label/Large-NoTracking",
    fontSizeKey: "size-md",
    fontWeightLabel: "Medium",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Label/Large-Badge",
    fontSizeKey: "size-md",
    fontWeightLabel: "Regular",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-tight",
  },
  {
    name: "Label/Medium",
    fontSizeKey: "size-sm",
    fontWeightLabel: "Medium",
    lineHeightKey: "line-height-xs",
    letterSpacingKey: "letter-spacing-default",
  },
  {
    name: "Label/XSmall",
    fontSizeKey: "size-xs",
    fontWeightLabel: "Regular",
    lineHeightKey: "line-height-xl",
    letterSpacingKey: "letter-spacing-tight",
  },
];
