import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  const pathname = window.location.pathname;
    return (
      <div className={`flex flex-col justify-around shadow-neomorphic ${pathname !== '/add' && pathname !== '/login' && pathname !== '/signup' ? 'hover:shadow-neomorphicInset' : '' } transition duration-150 ease-in-out border-none rounded-xl bg-background ${className}`}>
        <div className={(pathname !== '/add' && pathname !== '/login' && pathname !== '/signup') ? 'transition-transform duration-150 ease-in-out hover:scale-95' : ''}>
          {children}
        </div>
      </div>
    );
  }