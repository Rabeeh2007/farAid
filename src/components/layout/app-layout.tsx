import type { ReactNode } from "react";
import { Header } from "./header";
import { BottomNav } from "./bottom-nav";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">
        <div className="container mx-auto">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
