"use client";

const sections = ["Badge", "Button", "Kbd", "Divider", "Label"];

export function PlaygroundSidebar() {
  return (
    <div className="sticky top-[140px] hidden w-[228px] shrink-0 lg:block">
      <aside className="scrollbar-hide flex max-h-[calc(100vh_-_140px)] w-full flex-col gap-5 overflow-y-auto pb-10">
        <div className="flex w-full flex-col gap-3">
          <span className="text-sm font-medium leading-[1.4] tracking-[-0.14px] text-ink-600">
            Playground
          </span>
          <div className="flex flex-col gap-1">
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section.toLowerCase()}`}
                className="rounded-md px-3 py-2 text-sm font-medium leading-[1.16] tracking-[-0.14px] text-[#0f0f0f] transition-colors hover:bg-overlay"
              >
                {section}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
