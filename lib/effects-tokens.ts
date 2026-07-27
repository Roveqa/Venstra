export type ShadowLayer = {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
};

export type EffectRow = {
  name: string;
  layers: ShadowLayer[];
  boxShadow: string;
};

function layerBoxShadow(l: ShadowLayer) {
  return `${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`;
}

function toBoxShadow(layers: ShadowLayer[]) {
  return layers.map(layerBoxShadow).join(", ");
}

const shadowSmLayers: ShadowLayer[] = [
  { x: 0, y: 0, blur: 2, spread: 4, color: "rgba(0, 0, 0, 0.02)" },
  { x: 0, y: 1, blur: 2, spread: 1, color: "rgba(0, 0, 0, 0.02)" },
];
const shadowXlLayers: ShadowLayer[] = [
  { x: 0, y: 12, blur: 32, spread: -12, color: "rgba(0, 0, 0, 0.12)" },
  { x: 0, y: 2, blur: 4, spread: 0, color: "rgba(0, 0, 0, 0.04)" },
];
const shadowMdLayers: ShadowLayer[] = [
  { x: 0, y: 2, blur: 8, spread: 2, color: "rgba(0, 0, 0, 0.04)" },
];
const shadowLgLayers: ShadowLayer[] = [
  { x: 0, y: 2, blur: 26, spread: 0, color: "rgba(196, 196, 196, 0.20)" },
];
const focusLayers: ShadowLayer[] = [
  { x: 0, y: 0, blur: 0, spread: 2, color: "rgba(10, 10, 10, 0.10)" },
];
const focusErrorLayers: ShadowLayer[] = [
  { x: 0, y: 0, blur: 0, spread: 2, color: "rgba(253, 58, 54, 0.10)" },
];

export const shadowRows: EffectRow[] = [
  { name: "Shadow/sm", layers: shadowSmLayers, boxShadow: toBoxShadow(shadowSmLayers) },
  { name: "Shadow/xl", layers: shadowXlLayers, boxShadow: toBoxShadow(shadowXlLayers) },
  { name: "Shadow/md", layers: shadowMdLayers, boxShadow: toBoxShadow(shadowMdLayers) },
  { name: "Shadow/lg", layers: shadowLgLayers, boxShadow: toBoxShadow(shadowLgLayers) },
];

export const focusRows: EffectRow[] = [
  { name: "Focus", layers: focusLayers, boxShadow: toBoxShadow(focusLayers) },
  { name: "Focus-error", layers: focusErrorLayers, boxShadow: toBoxShadow(focusErrorLayers) },
];

export type DisabledRow = {
  name: string;
  valueText: string;
};

export const disabledRows: DisabledRow[] = [{ name: "disabled", valueText: "opacity: 40%" }];
