import "./globals.css";
import Sidenav from "./components/Sidenav/Sidenav";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUserId } from "./utils/services/authService";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = useLocation().pathname;

  return (
    <div className="h-screen flex-1 w-full flex gap-20 items-center">
      <div className="h-screen flex flex-col w-[15%] p-6">
        <Sidenav />
      </div>
      <div className="flex-1">
        {children}
      </div>

      {getCurrentUserId() !== null &&
      <div className="fixed bottom-0 right-0 w-full flex justify-center pb-2">
        <div className="p-4 rounded-full shadow-neomorphicInset">
            {pathname !== '/add' ? (
              <Link to="/add">
                <button className="rounded-full shadow-neomorphic p-2 hover:shadow-none active:shadow-none transition-all duration-150 ease-in-out">
                  <PlusIcon className="w-6 h-6 text-foreground" />
                </button>
              </Link>
            ) : (
              <Link to="/">
                <button className="rounded-full shadow-neomorphic p-2 hover:shadow-none active:shadow-none transition-all duration-150 ease-in-out">
                  <ChevronLeftIcon className="w-6 h-6 text-foreground" />
                </button>
              </Link>
            )}
        </div>
      </div>
      }
    </div>
  );
}