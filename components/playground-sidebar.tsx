"use client";

const sections = ["Badge", "Button", "Kbd", "Divider", "Label"];

export function PlaygroundSidebar({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (section: string) => void;
}) {
  return (
    <div className="sticky top-[140px] hidden w-[228px] shrink-0 lg:block">
      <aside className="scrollbar-hide flex max-h-[calc(100vh_-_140px)] w-full flex-col gap-5 overflow-y-auto pb-10">
        <div className="flex w-full flex-col gap-3">
          <span className="text-sm font-medium leading-[1.4] tracking-[-0.14px] text-ink-600">
            Playground
          </span>
          <div className="flex flex-col gap-1">
            {sections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() => onSelect(section)}
                className={`rounded-md px-3 py-2 text-left text-sm font-medium leading-[1.16] tracking-[-0.14px] text-[#0f0f0f] transition-colors ${
                  section === active ? "bg-overlay" : "hover:bg-overlay"
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
