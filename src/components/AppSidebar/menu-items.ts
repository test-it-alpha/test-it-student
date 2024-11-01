import { Calendar, History, Home, SquareCode } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Upcoming",
    url: "/upcoming",
    icon: SquareCode,
    badge: 0,
  },
  {
    title: "History",
    url: "/history",
    icon: History,
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
  },
  // {
  //   title: "Search",
  //   url: "#",
  //   icon: Search,
  // },
  // {
  //   title: "Settings",
  //   url: "#",
  //   icon: Settings,
  // },
];

export default items;
