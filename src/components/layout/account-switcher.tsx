"use client";

import useLocalStorage from "@/lib/hooks/use-local-storage";
import type { Profile } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

export function AccountSwitcher() {
  const [profiles] = useLocalStorage<Profile[]>("user-profiles", []);
  const [activeProfileId, setActiveProfileId] = useLocalStorage<string | null>("active-profile-id", null);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const activeProfile = profiles.find(p => p.id === activeProfileId);

  const handleSwitch = (id: string) => {
    setActiveProfileId(id);
    window.dispatchEvent(new Event('storage')); // Force update in other tabs
  };

  const handleLogout = () => {
    setActiveProfileId(null);
    window.dispatchEvent(new Event('storage'));
  };
  
  const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };

  if (!isClient) {
    return <Skeleton className="h-10 w-24" />;
  }

  if (!activeProfileId || !activeProfile) {
    return (
      <Button variant="outline" onClick={() => router.push('/profile')}>
        <User className="mr-2"/>
        Login
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={`https://avatar.vercel.sh/${activeProfile.name}.png`} alt={activeProfile.name} />
            <AvatarFallback>{getInitials(activeProfile.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{activeProfile.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {activeProfile.phone}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground">Switch account</DropdownMenuLabel>
        {profiles.filter(p => p.id !== activeProfileId).map(p => (
           <DropdownMenuItem key={p.id} onSelect={() => handleSwitch(p.id)}>
            <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={`https://avatar.vercel.sh/${p.name}.png`} alt={p.name} />
                <AvatarFallback>{getInitials(p.name)}</AvatarFallback>
            </Avatar>
            <span>{p.name}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => router.push('/profile')}>
          <Users className="mr-2 h-4 w-4" />
          <span>Manage Profiles</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
