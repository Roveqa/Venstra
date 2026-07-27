import fs from "node:fs";
import path from "node:path";
import { BlurReveal } from "./blur-reveal";
import { LightDarkSlider } from "./light-dark-slider";
import { ScrollReveal3D } from "./scroll-reveal-3d";

function readSvg(filename: string) {
  const svg = fs.readFileSync(
    path.join(process.cwd(), "public", "images", filename),
    "utf8"
  );
  return svg.replace(/ filter="url\(#filter0_d_[^)]*\)"/, "");
}

export function LightDark() {
  const lightSvg = readSvg("dashboard-mockup-light.svg");
  const darkSvg = readSvg("dashboard-mockup-dark.svg");

  return (
    <section className="flex w-full flex-col items-center gap-[60px] px-4 pt-24 pb-16 md:px-10 md:py-16 lg:py-[120px]">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-medium leading-[1.24] tracking-[-1.8px] text-ink-950 md:text-[48px] md:tracking-[-2.88px]">
          <BlurReveal className="block" text="Light and dark. One token system" />
        </h2>
        <p className="max-w-[470px] text-[16px] leading-[1.25] tracking-[-0.48px] text-ink-600">
          <BlurReveal
            baseDelay={150}
            stagger={6}
            text="Flip the switch — every component updates instantly. No separate files, no manual overrides. Variables handle everything."
          />
        </p>
      </div>

      <ScrollReveal3D>
        <div className="w-full max-w-[1222px]">
          <LightDarkSlider lightSvg={lightSvg} darkSvg={darkSvg} />
        </div>
      </ScrollReveal3D>
    </section>
  );
}
