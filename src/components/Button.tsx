import React from 'react';
import '../styles/animations.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

import { playPopSound } from '../utils/audioEffects';

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  children,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    playPopSound();
    if (onClick) onClick(e);
  };

  const baseStyles = "rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 btn-cute";

  const variants = {
    primary: "bg-[var(--color-red)] text-white shadow-lg hover:shadow-xl hover:bg-[#B71C1C]",
    secondary: "bg-[var(--color-pink)] text-[var(--color-text)] hover:bg-[#F48FB1]",
    outline: "border-2 border-[var(--color-red)] text-[var(--color-red)] hover:bg-[var(--color-red-light)]"
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
