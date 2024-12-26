"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Users,
  FileText,
  MessageSquare,
  Home,
  Menu,
  ChevronRight,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { ISidebarItem } from "@/interface/table.interface";

const sidebarItems: ISidebarItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
    badge: "New",
  },

  {
    name: "Users",
    href: "/users",
    icon: Users,
  },
  {
    name: "Posts",
    href: "/posts",
    icon: FileText,
  },
  {
    name: "Comments",
    href: "/comments",
    icon: MessageSquare,
  },
];

const bottomItems = [
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Logout",
    href: "/logout",
    icon: LogOut,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const SidebarContent = (
    <div
      className={cn(
        "flex h-[100vh] flex-col gap-4",
        isCollapsed && "items-center"
      )}
    >
      <div
        className={cn(
          "flex h-16 items-center border-b px-6",
          isCollapsed ? "justify-center" : "justify-between"
        )}
      >
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <Image
              src={"/images/logo.png"}
              alt="revLogo"
              width={600}
              height={600}
              className="h-8 w-8 "
            />
            <span className="text-xl font-bold">Revalgo</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="hidden md:flex"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronRight
            className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="flex-1 px-4">
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant={pathname === item.href ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start",
                isCollapsed && "h-12 w-12 justify-center p-0"
              )}
              onClick={() => setOpen(false)}
            >
              <Link href={item.href} className="relative">
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.name}
                {!isCollapsed && item.badge && (
                  <span className="ml-2 rounded-md bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                    {item.badge}
                  </span>
                )}
                {!isCollapsed && item.count && (
                  <span className="ml-auto rounded-md bg-muted px-1.5 py-0.5 text-xs">
                    {item.count}
                  </span>
                )}
                {isCollapsed && (item.badge || item.count) && (
                  <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-primary" />
                )}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      {/* <div className="border-t px-4 py-4">
        <div className="space-y-2">
          {bottomItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "w-full justify-start",
                isCollapsed && "h-12 w-12 justify-center p-0"
              )}
              onClick={() => setOpen(false)}
            >
              <Link href={item.href}>
                <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                {!isCollapsed && item.name}
              </Link>
            </Button>
          ))}
        </div>
      </div> */}
    </div>
  );

  return (
    <>
      {/* Mobile Sheet */}

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden fixed left-4 top-4 z-40"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          {SidebarContent}
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden border-r bg-background md:block",
          isCollapsed ? "w-16" : "w-64",
          "transition-all duration-300"
        )}
      >
        {SidebarContent}
      </div>
    </>
  );
}
