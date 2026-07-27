import { BlurReveal } from "./blur-reveal";
import { CountUp } from "./count-up";
import { ScrollReveal } from "./scroll-reveal";

const stats = [
  { number: "1440+", label: "Variants" },
  { number: "96", label: "Tokens" },
  { number: "27", label: "Components" },
  { number: "2", label: "Themes" },
];

export function Stats() {
  return (
    <section className="flex w-full flex-col items-center gap-[60px] px-4 py-24 md:px-10 lg:px-[244px] lg:py-[160px]">
      <h2 className="text-center text-3xl font-medium leading-[1.24] tracking-[-1.8px] text-ink-950 md:text-[48px] md:tracking-[-2.88px]">
        <BlurReveal className="block" text="What's inside" />
      </h2>

      <div className="grid w-full max-w-[1222px] grid-cols-2 md:flex md:items-center">
        {stats.map((stat, i) => (
          <ScrollReveal key={stat.label} delay={i * 100}>
            <div
              className={`flex flex-1 flex-col items-center gap-1 px-4 py-6 text-center md:px-8 md:py-3 border-stroke ${
                i % 2 === 1 ? "border-l" : ""
              } ${i >= 2 ? "border-t md:border-t-0" : ""} ${
                i > 0 ? "md:border-l" : "md:border-l-0"
              }`}
            >
              <CountUp
                value={stat.number}
                className="whitespace-nowrap text-4xl font-medium leading-[1.2] tracking-[-1.68px] text-ink-950 md:text-[56px]"
              />
              <span className="text-[16px] leading-[1.2] tracking-[-0.48px] text-[rgba(4,4,4,0.44)]">
                {stat.label}
              </span>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
