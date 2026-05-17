import { useLocation, Link } from "react-router-dom";
// Icons
import TodoIcon from "../ui/NavIcons/TodoIcon";
import ShopIcon from "../ui/NavIcons/ShopIcon";
import LaterIcon from "../ui/NavIcons/LaterIcon";

const links = [
  { to: "/", Icon: TodoIcon, alt: "To Do" },
  { to: "/shop", Icon: ShopIcon, alt: "Shop" },
  { to: "/do-later", Icon: LaterIcon, alt: "Do Later" },
];

export default function Navigation() {
  const { pathname } = useLocation();

  const baseStyle = "transition-all duration-300 py-1 ease-in-out px-10 cursor-pointer w-1/3 text-center uppercase bg-emerald-400";
  const activeStyle = "bg-gradient-to-r from-emerald-400 via-sky-400 to-emerald-400";

  return (
    <footer className="flex flex-col fixed bottom-0 left-0 w-full text-center">
      <nav className="flex justify-evenly z-10 bg-emerald-400 transition-colors duration-300 ease-in-out">
        {links.map(({ to, Icon, alt }) => (
          <Link key={to} to={to} className={`${baseStyle} ${pathname === to ? activeStyle : ""}`}>
            <Icon className="mx-auto w-7 h-7 md:w-12 md:h-12" aria-label={alt} />
          </Link>
        ))}
      </nav>
      <p className="relative py-1 text-xs text-stone-500/70 tracking-widest backdrop-invert-40 -z-10">
        Todoezel | © {new Date().getFullYear()} <span className="cursor-pointer">Liascope </span>
      </p>
    </footer>
  );
}
