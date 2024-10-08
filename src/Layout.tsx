import "./globals.css";
import Sidenav from "./components/Sidenav/Sidenav";
import { ChevronLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { getCurrentUserId } from "./utils/services/authService";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = useLocation().pathname;
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row">
      <Sidenav isOpen={isSidenavOpen} setIsOpen={setIsSidenavOpen} />
      <div className="flex-1 xl:overflow-hidden">
        <main className="p-4 lg:p-6">
          {children}
        </main>

        {getCurrentUserId() !== null && (
          <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6">
            <div className="p-2 lg:p-4 rounded-full shadow-neomorphicInset">
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
        )}
      </div>
    </div>
  );
}