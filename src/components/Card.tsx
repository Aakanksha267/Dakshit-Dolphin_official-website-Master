import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({ children, className = '', hoverable = false }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden ${
        hoverable ? 'transition-transform hover:scale-105 hover:shadow-xl' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
