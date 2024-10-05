import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  const pathname = window.location.pathname;
    return (
      <div className={`shadow-neomorphic ${pathname !== '/add' ? 'hover:shadow-neomorphicInset' : '' } transition duration-150 ease-in-out border-none rounded-xl bg-background ${className}`}>
        <div className={pathname !== '/add' ? 'transition-transform duration-150 ease-in-out hover:scale-95' : ''}>
          {children}
        </div>
      </div>
    );
  }