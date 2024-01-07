"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";

import {
  Activity,
  Bookmark,
  ChevronLeft,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import React, { FC, useEffect, useRef, useState } from "react";
import { Switch } from "@/components/ui/switch";

interface MoreDropdownProps {}
const MoreDropdown: FC<MoreDropdownProps> = (): JSX.Element => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const [showModeToggle, setShowModeToggle] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: MouseEvent): void => {
    if (!event.target) return;
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenMenu(false);
      setShowModeToggle(false);
    }
  };
  useEffect(() => {
    // componentDidMount and componentDidUpdate
    document.addEventListener("mousedown", handleOutsideClick);
    // componentWillUnMount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dropdownRef]);
  return (
    <DropdownMenu open={openMenu}>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setOpenMenu((prev) => !prev)}
          variant={"ghost"}
          size={"lg"}
          className="md:w-full !justify-start space-x-2 !px-3"
        >
          <Menu />
          <div className="hidden lg:block">More</div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        ref={dropdownRef}
        className={cn(
          "dark:bg-neutral-800 w-64 !rounded-xl !p-0 transition-opacity",
          !openMenu && "opacity-0"
        )}
        align="end"
        alignOffset={-40}
      >
        {!showModeToggle ? (
          <>
            <DropdownMenuItem className="menuItem">
              <Settings size={20} />
              <p>Settings</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Activity size={20} />
              <p>Your activity</p>
            </DropdownMenuItem>
            <DropdownMenuItem className="menuItem">
              <Bookmark size={20} />
              <p>Saved</p>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="menuItem"
              onClick={() => setShowModeToggle(true)}
            >
              <Moon size={20} className="!cursor-pointer" />
              <p className="!cursor-pointer">Switch appearance</p>
            </DropdownMenuItem>

            <DropdownMenuItem className="menuItem" onClick={() => signOut()}>
              <LogOut size={20} />
              <p>Log out</p>
            </DropdownMenuItem>
          </>
        ) : (
          <></>
        )}

        {showModeToggle ? (
          <>
            <div className="flex items-center border-b border-gray-200 dark:border-neutral-700 py-3.5 px-2.5">
              <ChevronLeft
                size={18}
                onClick={() => setShowModeToggle(false)}
                className="cursor-pointer"
              />
              <p className="font-bold ml-1 ">Switch appearance</p>
              {theme === "dark" ? (
                <Moon size={20} className="ml-auto" />
              ) : (
                <Sun size={20} className="ml-auto" />
              )}
            </div>

            <Label htmlFor="dark-mode" className="menuItem">
              Dark Mode
              <DropdownMenuItem className="ml-auto !p-0">
                <Switch
                  id="dark-mode"
                  className="ml-auto"
                  checked={theme === "dark"}
                  onCheckedChange={(checked) => {
                    setTheme(checked ? "dark" : "light");
                  }}
                />
              </DropdownMenuItem>
            </Label>
          </>
        ) : (
          <></>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MoreDropdown;
