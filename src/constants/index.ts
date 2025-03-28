import { NavLink } from "../types";
const weatherAppApi = `https://api.openweathermap.org/data/3.0/onecall/timemachine?`;
export const navLInks: NavLink[] = [
  { id: 1, text: "Home", path: "/" },
  { id: 2, text: "Timer", path: "/timer" },
  { id: 3, text: "Weather", path: "/weather" },
  { id: 4, text: "Reminder", path: "/reminder" },
  { id: 5, text: "Calculator", path: "/calculator" },
];
