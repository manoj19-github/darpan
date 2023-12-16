import {
  Bell,
  Clapperboard,
  Compass,
  Heart,
  Home,
  MessageCircle,
  PlusSquare,
  Search,
} from "lucide-react";
import { AppConfigInterface } from "./interfaces/appConfig.interface";

export const AppNavLinks: AppConfigInterface[] = [
  {
    name: "Home",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: Search,
    hideOnMobile: true,
  },
  {
    name: "Explore",
    href: "/dashboard/explore",
    icon: Compass,
    hideOnMobile: true,
  },
  {
    name: "Reels",
    href: "/dashboard/reels",
    icon: Clapperboard,
  },
  {
    name: "Message",
    href: "/dashboard/message",
    icon: MessageCircle,
  },
  {
    name: "Notification",
    href: "/dashboard/notifications",
    icon: Bell,
    hideOnMobile: true,
  },
  {
    name: "Favoirites",
    href: "/dashboard/favourites",
    icon: Heart,
  },
  {
    name: "Create",
    href: "/dashboard/create",
    icon: PlusSquare,
  },
];
