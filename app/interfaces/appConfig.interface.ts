import { LucideIcon } from "lucide-react";

export interface AppConfigInterface {
  name: string;
  href: string;
  icon: LucideIcon;
  hideOnMobile?: boolean;
}
