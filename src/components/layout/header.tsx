import { Icons } from "@/components/icons";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";
import { AccountSwitcher } from "./account-switcher";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.Logo className="h-8 w-8 text-primary" />
          <span className="font-bold text-xl font-headline">farAid</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <AccountSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
