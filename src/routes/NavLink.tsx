import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  activeClassName?: string;
  inactiveClassName?: string;
}

const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  activeClassName = 'bg-gray-300 text-gray-600 font-normal',
  inactiveClassName = 'text-gray-500 hover:bg-gray-300 hover:text-gray-600',
}) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`block p-2 h-8 flex justify-between items-center rounded ${
        isActive ? activeClassName : inactiveClassName
      }`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
