"use client";

import { Home, HeartPulse, Users, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/wellness-tracker", label: "Wellness", icon: HeartPulse },
  { href: "/support-locator", label: "Support", icon: Users },
  { href: "/schemes", label: "Schemes", icon: FileText },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border shadow-t-lg z-50">
      <nav className="h-full">
        <ul className="flex justify-around items-center h-full">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link href={item.href} className="flex flex-col items-center gap-1">
                  <item.icon className={cn("size-6", isActive ? "text-primary" : "text-muted-foreground")} />
                  <span className={cn("text-xs", isActive ? "text-primary font-semibold" : "text-muted-foreground")}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
