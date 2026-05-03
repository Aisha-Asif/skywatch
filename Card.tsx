import React from 'react';
import { cn } from './utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default', ...props }) => {
  const baseStyles = "rounded-3xl border shadow-sm transition-all duration-300";
  const variants = {
    default: "bg-white border-slate-200",
    outline: "bg-transparent border-slate-300",
    glass: "bg-white/80 backdrop-blur-xl border-slate-200"
  };

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props}>
      {children}
    </div>
  );
};
