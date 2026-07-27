import fs from "fs";
import path from "path";

function namespaceIds(svg: string, prefix: string): string {
  const matches = Array.from(svg.matchAll(/\bid="([^"]+)"/g));
  const ids = Array.from(new Set(matches.map((m) => m[1])));

  let result = svg;
  for (const id of ids) {
    const escaped = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const uniqueId = `${prefix}-${id}`;
    result = result
      .replace(new RegExp(`id="${escaped}"`, "g"), `id="${uniqueId}"`)
      .replace(new RegExp(`url\\(#${escaped}\\)`, "g"), `url(#${uniqueId})`)
      .replace(new RegExp(`xlink:href="#${escaped}"`, "g"), `xlink:href="#${uniqueId}"`)
      .replace(new RegExp(`href="#${escaped}"`, "g"), `href="#${uniqueId}"`);
  }
  return result;
}

export function readSvg(publicPath: string): string {
  const raw = fs.readFileSync(path.join(process.cwd(), "public", publicPath), "utf-8");
  const prefix = publicPath.replace(/[^a-zA-Z0-9]/g, "-");
  return namespaceIds(raw, prefix);
}
