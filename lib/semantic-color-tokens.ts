import { primitiveColorGroups } from "./color-tokens";

export type SemanticRow = { name: string; light: string; dark: string };
export type SemanticGroup = { title: string; rows: SemanticRow[] };

function lookup(group: string, rowName: string): string {
  const g = primitiveColorGroups.find((g) => g.title === group);
  const row = g?.rows.find((r) => r.name === rowName);
  if (!row) return "#000000";
  return row.value;
}

/** Resolves a display reference like "Neutral/Solid/50" or "Primary/Default/Alpha/alpha-10" to a hex/rgba value. */
export function resolveColorRef(ref: string): string {
  const parts = ref.split("/");
  const group = parts[0];
  const rest = parts.slice(1);

  if (group === "Primary") {
    const [variant, ...tail] = rest;
    const rowName =
      tail[0] === "Alpha" ? `${variant}/Alpha/${tail[1]}` : `${variant}/Solid/${tail[0]}`;
    return lookup("Primary", rowName);
  }

  return lookup(group, rest.join("/"));
}

export const semanticColorGroups: SemanticGroup[] = [
  {
    title: "Surface",
    rows: [
      { name: "Base/surface-low", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      { name: "Base/surface-muted", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      { name: "Base/surface-elevated", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      { name: "Base/surface-subtle", light: "Neutral/Solid/100", dark: "Neutral/Solid/800" },
      { name: "Base/surface-subtle-hover", light: "Neutral/Solid/200", dark: "Neutral/Solid/700" },
      { name: "Base/surface-soft", light: "Neutral/Solid/200", dark: "Neutral/Solid/700" },
      { name: "Base/surface-strong", light: "Neutral/Solid/300", dark: "Neutral/Solid/600" },
      { name: "Base/surface-strong-hover", light: "Neutral/Solid/400", dark: "Neutral/Solid/500" },
      { name: "Base/surface-inverse", light: "Neutral/Solid/950", dark: "Neutral/Solid/50" },
      { name: "Neutral/surface-neutral", light: "Neutral/Solid/950", dark: "Neutral/Solid/50" },
      { name: "Neutral/surface-neutral-low", light: "Neutral/Solid/100", dark: "Neutral/Solid/700" },
      { name: "Neutral/surface-neutral-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      {
        name: "Primary/Overlay/surface-primary-hover",
        light: "Primary/Default/Alpha/alpha-12",
        dark: "Primary/Default/Alpha/alpha-16",
      },
      {
        name: "Primary/Overlay/surface-primary-active",
        light: "Primary/Default/Alpha/alpha-16",
        dark: "Primary/Default/Alpha/alpha-20",
      },
      { name: "Error/surface-error", light: "Red/Solid/500", dark: "Red/Solid/600" },
      { name: "Error/surface-error-low", light: "Red/Solid/100", dark: "Red/Solid/900" },
      { name: "Error/surface-error-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      { name: "Success/surface-success", light: "Green/Solid/500", dark: "Green/Solid/600" },
      { name: "Success/surface-success-low", light: "Green/Solid/100", dark: "Green/Solid/900" },
      {
        name: "Success/surface-success-inverse",
        light: "Neutral/Solid/50",
        dark: "Neutral/Solid/950",
      },
      { name: "Warning/surface-warning", light: "Amber/Solid/500", dark: "Amber/Solid/600" },
      { name: "Warning/surface-warning-low", light: "Amber/Solid/100", dark: "Amber/Solid/900" },
      {
        name: "Warning/surface-warning-inverse",
        light: "Neutral/Solid/50",
        dark: "Neutral/Solid/950",
      },
      { name: "Info/surface-info", light: "Blue/Solid/500", dark: "Blue/Solid/600" },
      { name: "Info/surface-info-low", light: "Blue/Solid/100", dark: "Blue/Solid/900" },
      { name: "Info/surface-info-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
    ],
  },
  {
    title: "Fill",
    rows: [
      { name: "Base/fill-base", light: "Neutral/Solid/300", dark: "Neutral/Solid/800" },
      {
        name: "Primary/Default/Default/fill-primary",
        light: "Primary/Default/500",
        dark: "Primary/Default/600",
      },
      {
        name: "Primary/Default/Default/fill-primary-hover",
        light: "Primary/Default/400",
        dark: "Primary/Default/500",
      },
      {
        name: "Primary/Default/Default/fill-primary-active",
        light: "Primary/Default/600",
        dark: "Primary/Default/700",
      },
      {
        name: "Primary/Default/Inverse/fill-primary",
        light: "Primary/Inverse/50",
        dark: "Primary/Inverse/50",
      },
      {
        name: "Primary/Default/Inverse/fill-primary-hover",
        light: "Primary/Default/50",
        dark: "Primary/Default/50",
      },
      {
        name: "Primary/Default/Inverse/fill-primary-active",
        light: "Primary/Inverse/50",
        dark: "Primary/Inverse/50",
      },
      {
        name: "Primary/Overlay/Default/fill-primary",
        light: "Primary/Default/Alpha/alpha-10",
        dark: "Primary/Default/Alpha/alpha-20",
      },
      {
        name: "Primary/Overlay/Default/fill-primary-hover",
        light: "Primary/Default/Alpha/alpha-12",
        dark: "Primary/Default/Alpha/alpha-16",
      },
      {
        name: "Primary/Overlay/Default/fill-primary-active",
        light: "Primary/Default/Alpha/alpha-16",
        dark: "Primary/Default/Alpha/alpha-16",
      },
      {
        name: "Primary/Overlay/Inverse/fill-primary",
        light: "Primary/Inverse/Alpha/alpha-10",
        dark: "Primary/Inverse/Alpha/alpha-10",
      },
      {
        name: "Primary/Overlay/Inverse/fill-primary-hover",
        light: "Primary/Inverse/Alpha/alpha-12",
        dark: "Primary/Inverse/Alpha/alpha-12",
      },
      {
        name: "Primary/Overlay/Inverse/fill-primary-active",
        light: "Primary/Inverse/Alpha/alpha-16",
        dark: "Primary/Inverse/Alpha/alpha-16",
      },
      {
        name: "Neutral/Default/Default/fill-neutral",
        light: "Neutral/Solid/950",
        dark: "Neutral/Solid/50",
      },
      {
        name: "Neutral/Default/Default/fill-neutral-hover",
        light: "Neutral/Solid/900",
        dark: "Neutral/Solid/100",
      },
      {
        name: "Neutral/Default/Default/fill-neutral-active",
        light: "Neutral/Solid/950",
        dark: "Neutral/Solid/200",
      },
      {
        name: "Neutral/Default/Inverse/fill-neutral",
        light: "Neutral/Solid/50",
        dark: "Neutral/Solid/950",
      },
      {
        name: "Neutral/Default/Inverse/fill-neutral-hover",
        light: "Neutral/Solid/100",
        dark: "Neutral/Solid/900",
      },
      {
        name: "Neutral/Default/Inverse/fill-neutral-active",
        light: "Neutral/Solid/50",
        dark: "Neutral/Solid/950",
      },
      {
        name: "Neutral/Overlay/Default/fill-neutral",
        light: "Neutral/Alpha/Black/alpha-4",
        dark: "Neutral/Alpha/White/alpha-8",
      },
      {
        name: "Neutral/Overlay/Default/fill-neutral-hover",
        light: "Neutral/Alpha/Black/alpha-8",
        dark: "Neutral/Alpha/White/alpha-12",
      },
      {
        name: "Neutral/Overlay/Default/fill-neutral-active",
        light: "Neutral/Alpha/Black/alpha-4",
        dark: "Neutral/Alpha/White/alpha-8",
      },
      {
        name: "Neutral/Overlay/Inverse/fill-neutral",
        light: "Neutral/Alpha/White/alpha-12",
        dark: "Neutral/Alpha/Black/alpha-4",
      },
      {
        name: "Neutral/Overlay/Inverse/fill-neutral-hover",
        light: "Neutral/Alpha/White/alpha-16",
        dark: "Neutral/Alpha/Black/alpha-8",
      },
      {
        name: "Neutral/Overlay/Inverse/fill-neutral-active",
        light: "Neutral/Alpha/White/alpha-20",
        dark: "Neutral/Alpha/Black/alpha-12",
      },
      { name: "Error/Default/fill-error", light: "Red/Solid/500", dark: "Red/Solid/700" },
      { name: "Error/Default/fill-error-hover", light: "Red/Solid/400", dark: "Red/Solid/600" },
      { name: "Error/Default/fill-error-active", light: "Red/Solid/600", dark: "Red/Solid/800" },
      { name: "Error/Overlay/fill-error", light: "Red/Alpha/alpha-10", dark: "Red/Alpha/alpha-20" },
      {
        name: "Error/Overlay/fill-error-hover",
        light: "Red/Alpha/alpha-12",
        dark: "Red/Alpha/alpha-24",
      },
      {
        name: "Error/Overlay/fill-error-active",
        light: "Red/Alpha/alpha-16",
        dark: "Red/Alpha/alpha-28",
      },
      { name: "Success/Default/fill-success", light: "Green/Solid/500", dark: "Green/Solid/700" },
      {
        name: "Success/Default/fill-success-hover",
        light: "Green/Solid/400",
        dark: "Green/Solid/600",
      },
      {
        name: "Success/Default/fill-success-active",
        light: "Green/Solid/600",
        dark: "Green/Solid/800",
      },
      {
        name: "Success/Overlay/fill-success",
        light: "Green/Alpha/alpha-10",
        dark: "Green/Alpha/alpha-20",
      },
      {
        name: "Success/Overlay/fill-success-hover",
        light: "Green/Alpha/alpha-12",
        dark: "Green/Alpha/alpha-24",
      },
      {
        name: "Success/Overlay/fill-success-active",
        light: "Green/Alpha/alpha-16",
        dark: "Green/Alpha/alpha-28",
      },
      { name: "Warning/Default/fill-warning", light: "Amber/Solid/500", dark: "Amber/Solid/700" },
      {
        name: "Warning/Default/fill-warning-hover",
        light: "Amber/Solid/400",
        dark: "Amber/Solid/600",
      },
      {
        name: "Warning/Default/fill-warning-active",
        light: "Amber/Solid/600",
        dark: "Amber/Solid/800",
      },
      {
        name: "Warning/Overlay/fill-warning",
        light: "Amber/Alpha/alpha-10",
        dark: "Amber/Alpha/alpha-20",
      },
      {
        name: "Warning/Overlay/fill-warning-hover",
        light: "Amber/Alpha/alpha-12",
        dark: "Amber/Alpha/alpha-24",
      },
      {
        name: "Warning/Overlay/fill-warning-active",
        light: "Amber/Alpha/alpha-16",
        dark: "Amber/Alpha/alpha-28",
      },
      { name: "Info/Default/fill-info", light: "Blue/Solid/500", dark: "Blue/Solid/600" },
      { name: "Info/Default/fill-info-hover", light: "Blue/Solid/400", dark: "Blue/Solid/500" },
      { name: "Info/Default/fill-info-active", light: "Blue/Solid/600", dark: "Blue/Solid/700" },
      { name: "Info/Overlay/fill-info", light: "Blue/Alpha/alpha-10", dark: "Blue/Alpha/alpha-20" },
      {
        name: "Info/Overlay/fill-info-hover",
        light: "Blue/Alpha/alpha-12",
        dark: "Blue/Alpha/alpha-24",
      },
      {
        name: "Info/Overlay/fill-info-active",
        light: "Blue/Alpha/alpha-16",
        dark: "Blue/Alpha/alpha-28",
      },
    ],
  },
  {
    title: "Foreground",
    rows: [
      { name: "foreground", light: "Neutral/Solid/950", dark: "Neutral/Solid/50" },
      { name: "foreground-subtle", light: "Neutral/Solid/700", dark: "Neutral/Solid/200" },
      { name: "foreground-muted", light: "Neutral/Solid/500", dark: "Neutral/Solid/400" },
      { name: "foreground-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      { name: "foreground-weak", light: "Neutral/Solid/600", dark: "Neutral/Solid/500" },
      {
        name: "Base/Overlay/Default/foreground-base-muted",
        light: "Neutral/Alpha/Black/alpha-32",
        dark: "Neutral/Alpha/White/alpha-80",
      },
      {
        name: "Base/Overlay/Inverse/foreground-base",
        light: "Neutral/Alpha/White/alpha-80",
        dark: "Neutral/Alpha/White/alpha-80",
      },
      {
        name: "Neutral/Default/foreground-neutral-strong",
        light: "Neutral/Solid/950",
        dark: "Neutral/Solid/50",
      },
      { name: "Neutral/Default/foreground-neutral", light: "Neutral/Solid/900", dark: "Neutral/Solid/50" },
      {
        name: "Neutral/Default/foreground-neutral-subtle",
        light: "Neutral/Solid/800",
        dark: "Neutral/Solid/200",
      },
      { name: "Neutral/Inverse/foreground-neutral", light: "Neutral/Solid/50", dark: "Neutral/Solid/950" },
      { name: "Neutral/Inverse/foreground-subtle", light: "Neutral/Solid/100", dark: "Neutral/Solid/700" },
      {
        name: "Primary/Default/foreground-primary",
        light: "Primary/Default/500",
        dark: "Primary/Default/600",
      },
      {
        name: "Primary/Default/foreground-primary-subtle",
        light: "Primary/Default/400",
        dark: "Primary/Default/500",
      },
      {
        name: "Primary/Default/foreground-primary-strong",
        light: "Primary/Default/600",
        dark: "Primary/Default/700",
      },
      { name: "Primary/Inverse/foreground-primary", light: "Primary/Inverse/50", dark: "Primary/Inverse/50" },
      { name: "Primary/Inverse/foreground-subtle", light: "Primary/Default/50", dark: "Primary/Default/50" },
      { name: "Error/foreground-error-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/50" },
      { name: "Error/foreground-error-subtle", light: "Red/Solid/400", dark: "Red/Solid/400" },
      { name: "Error/foreground-error", light: "Red/Solid/500", dark: "Red/Solid/600" },
      { name: "Error/foreground-error-strong", light: "Red/Solid/950", dark: "Red/Solid/50" },
      { name: "Success/foreground-success-subtle", light: "Green/Solid/400", dark: "Green/Solid/400" },
      { name: "Success/foreground-success", light: "Green/Solid/500", dark: "Green/Solid/600" },
      { name: "Success/foreground-success-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/50" },
      { name: "Success/foreground-success-strong", light: "Green/Solid/950", dark: "Green/Solid/50" },
      { name: "Warning/foreground-warning-subtle", light: "Amber/Solid/400", dark: "Amber/Solid/400" },
      { name: "Warning/foreground-warning", light: "Amber/Solid/500", dark: "Amber/Solid/600" },
      { name: "Warning/foreground-warning-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/50" },
      { name: "Warning/foreground-warning-strong", light: "Amber/Solid/950", dark: "Amber/Solid/50" },
      { name: "Info/foreground-info-inverse", light: "Neutral/Solid/50", dark: "Neutral/Solid/50" },
      { name: "Info/foreground-info-subtle", light: "Blue/Solid/400", dark: "Blue/Solid/400" },
      { name: "Info/foreground-info", light: "Blue/Solid/500", dark: "Blue/Solid/600" },
      { name: "Info/foreground-info-strong", light: "Blue/Solid/950", dark: "Blue/Solid/50" },
    ],
  },
  {
    title: "Stroke",
    rows: [
      { name: "stroke", light: "Neutral/Solid/300", dark: "Neutral/Solid/800" },
      { name: "stroke-subtle", light: "Neutral/Solid/400", dark: "Neutral/Solid/700" },
      { name: "stroke-strong", light: "Neutral/Solid/500", dark: "Neutral/Solid/600" },
      { name: "stroke-emphasis", light: "Neutral/Solid/950", dark: "Neutral/Solid/50" },
      { name: "stroke-bold", light: "Neutral/Solid/800", dark: "Neutral/Solid/300" },
      {
        name: "Neutral/Default/stroke-neutral-strong",
        light: "Neutral/Solid/400",
        dark: "Neutral/Solid/800",
      },
      { name: "Neutral/Default/stroke-neutral", light: "Neutral/Solid/300", dark: "Neutral/Solid/700" },
      {
        name: "Neutral/Default/stroke-neutral-subtle",
        light: "Neutral/Solid/200",
        dark: "Neutral/Solid/600",
      },
      {
        name: "Neutral/Inverse/stroke-neutral",
        light: "Neutral/Alpha/White/alpha-80",
        dark: "Neutral/Alpha/Black/alpha-80",
      },
      {
        name: "Neutral/Inverse/stroke-neutral-subtle",
        light: "Neutral/Alpha/White/alpha-88",
        dark: "Neutral/Alpha/Black/alpha-88",
      },
      { name: "Primary/Default/stroke-primary", light: "Primary/Default/500", dark: "Primary/Default/600" },
      {
        name: "Primary/Default/stroke-primary-subtle",
        light: "Primary/Default/400",
        dark: "Primary/Default/500",
      },
      {
        name: "Primary/Default/stroke-primary-strong",
        light: "Primary/Default/600",
        dark: "Primary/Default/700",
      },
      { name: "Primary/Inverse/stroke-primary", light: "Primary/Inverse/50", dark: "Primary/Inverse/50" },
      {
        name: "Primary/Inverse/stroke-primary-subtle",
        light: "Primary/Default/50",
        dark: "Primary/Default/50",
      },
      { name: "Error/stroke-error-strong", light: "Red/Solid/600", dark: "Red/Solid/700" },
      { name: "Error/stroke-error", light: "Red/Solid/500", dark: "Red/Solid/600" },
      { name: "Error/stroke-error-subtle", light: "Red/Solid/400", dark: "Red/Solid/500" },
      { name: "Success/stroke-success-strong", light: "Green/Solid/600", dark: "Green/Solid/700" },
      { name: "Success/stroke-success", light: "Green/Solid/500", dark: "Green/Solid/600" },
      { name: "Success/stroke-success-subtle", light: "Green/Solid/400", dark: "Green/Solid/500" },
      { name: "Warning/stroke-warning-strong", light: "Amber/Solid/600", dark: "Amber/Solid/700" },
      { name: "Warning/stroke-warning", light: "Amber/Solid/500", dark: "Amber/Solid/600" },
      { name: "Warning/stroke-warning-subtle", light: "Amber/Solid/400", dark: "Amber/Solid/500" },
      { name: "Info/stroke-info-strong", light: "Blue/Solid/600", dark: "Blue/Solid/700" },
      { name: "Info/stroke-info", light: "Blue/Solid/500", dark: "Blue/Solid/600" },
      { name: "Info/stroke-info-subtle", light: "Blue/Solid/400", dark: "Blue/Solid/500" },
    ],
  },
];
