import { DocsSidebar } from "@/components/docs-sidebar";
import { Header } from "@/components/header";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center">
      <Header />

      <div className="flex w-full max-w-[1710px] items-start gap-[83px] px-4 pt-[140px] md:px-10 lg:px-[244px]">
        <DocsSidebar />

        <div className="flex w-full max-w-[704px] flex-col gap-9 pb-24">{children}</div>
      </div>
    </main>
  );
}
