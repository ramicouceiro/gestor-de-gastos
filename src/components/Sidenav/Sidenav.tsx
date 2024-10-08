import { getCurrentUserId, logout } from '../../utils/services/authService';
import { Link } from 'react-router-dom';
import {
  HomeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowTrendingUpIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'DASHBOARD', icon: HomeIcon, href: '/' },
  { name: 'GASTOS', icon: ArrowDownIcon, href: '/expenses' },
  { name: 'INGRESOS', icon: ArrowUpIcon, href: '/income' },
  { name: 'INVERSIONES', icon: ArrowTrendingUpIcon, href: '/investments' },
];

export default function Sidenav({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
  const handleLogout = async () => {
    await logout();
    // reload the page
    window.location.reload();
  };

  const toggleSidenav = () => {
    setIsOpen(!isOpen);
  };

  const buttonClasses = `
    w-full
    rounded-xl
    flex items-center justify-center space-x-3
    text-foreground font-medium
    shadow-neomorphic
    transition-all duration-150 ease-in-out
    hover:shadow-neomorphicInset
    active:shadow-neomorphicInset
  `;

  return (
    getCurrentUserId() !== null && (
      <>
        <button
          onClick={toggleSidenav}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-background shadow-neomorphic"
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
        <aside
          className={`
            fixed top-0 left-0 h-full w-full lg:w-64 bg-background
            transform transition-transform duration-300 ease-in-out
            lg:relative lg:translate-x-0
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            flex flex-col p-4
            z-40
          `}
        >
          <div className="flex flex-col justify-center flex-grow gap-5">
            {links.map((link) => {
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`${buttonClasses} mb-4 transition-all duration-150 ease-in-out`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className={`transition-all duration-150 ease-in-out w-full h-full flex items-center justify-center py-3 px-4 hover:scale-95`}>
                    <LinkIcon className="w-6 h-6 mr-2" />
                    <b>{link.name}</b>
                  </div>
                </Link>
              );
            })}
          </div>
          <button
            onClick={handleLogout}
            className={`${buttonClasses} mt-auto transition-all duration-150 ease-in-out`}
          >
            <div className={`transition-all duration-150 ease-in-out w-full h-full flex items-center justify-center py-3 px-4 hover:scale-95`}>
              <b className='text-red-500'>Logout</b>
            </div>
          </button>
        </aside>
      </>
    )
  );
}