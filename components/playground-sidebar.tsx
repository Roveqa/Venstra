"use client";

type SidebarEntry = string | { label: string; children: { key: string; label: string }[] };

const sections: SidebarEntry[] = [
  "Alert",
  "Avatar",
  "Badge",
  "Button",
  {
    label: "Input",
    children: [
      { key: "Input", label: "Text" },
      { key: "Password", label: "Password" },
    ],
  },
  "Kbd",
  "Divider",
  "Label",
  "Notification",
  "Progress",
  "Textarea",
];

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
            {sections.map((entry) => {
              if (typeof entry === "string") {
                return (
                  <button
                    key={entry}
                    type="button"
                    onClick={() => onSelect(entry)}
                    className={`rounded-md px-3 py-2 text-left text-sm font-medium leading-[1.16] tracking-[-0.14px] text-[#0f0f0f] transition-colors ${
                      entry === active ? "bg-overlay" : "hover:bg-overlay"
                    }`}
                  >
                    {entry}
                  </button>
                );
              }

              const isGroupActive = entry.children.some((c) => c.key === active);

              return (
                <div key={entry.label} className="flex flex-col gap-1">
                  <span
                    className={`rounded-md px-3 py-2 text-left text-sm font-medium leading-[1.16] tracking-[-0.14px] ${
                      isGroupActive ? "text-[#0f0f0f]" : "text-ink-600"
                    }`}
                  >
                    {entry.label}
                  </span>
                  <div className="flex flex-col gap-1 border-l border-stroke pl-3">
                    {entry.children.map((child) => (
                      <button
                        key={child.key}
                        type="button"
                        onClick={() => onSelect(child.key)}
                        className={`rounded-md px-3 py-2 text-left text-sm font-medium leading-[1.16] tracking-[-0.14px] text-[#0f0f0f] transition-colors ${
                          child.key === active ? "bg-overlay" : "hover:bg-overlay"
                        }`}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
