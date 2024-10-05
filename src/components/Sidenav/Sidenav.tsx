import { Link } from 'react-router-dom';

import {
  HomeIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'DASHBOARD', icon: HomeIcon, href: '/' },
  { name: 'GASTOS', icon: ArrowDownIcon, href: '/expenses' },
  { name: 'INGRESOS', icon: ArrowUpIcon, href: '/income' },
  { name: 'INVERSIONES', icon: ArrowTrendingUpIcon, href: '/investments' },
];

export default function Sidenav() {
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
    <aside className="h-full flex flex-col space-y-4 bg-background xl:flex md:hidden">
      <div className="mb-8 flex justify-center">
      </div>
      <div className="flex flex-grow space-y-4 flex-col gap-5">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              to={link.href}
              className={`${buttonClasses} transition-all duration-150 ease-in-out`
              }
            >
              <div className={`transition-all duration-150 ease-in-out w-full h-full flex items-center justify-center py-3 px-4 hover:scale-95`}>
                <LinkIcon className="w-6 h-6 mr-2" />
                <b>{link.name}</b>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}