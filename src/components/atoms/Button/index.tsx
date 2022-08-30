import React, { FC } from 'react';

interface ButtonProps {
   type?: HTMLButtonElement | string | undefined;
   size?: string;
   color?: string;
   bgColor?: string;
   bgHoverColor?: string;
   primary?: string;
   className?: string;
   textButton: string;
   disabled?: boolean;
   onClick?: (e: any) => void;
}

export const Button: FC<ButtonProps> = ({
   type,
   size = 'h-12',
   color = 'text-[#FCFCFD]',
   bgColor = 'bg-[#3772FF]',
   bgHoverColor = 'hover:bg-[#0045ea]',
   className = 'mt-8',
   textButton,
   disabled,
   onClick
}) => <button
   disabled={disabled}
   type={type ? "button" : "reset"}
   className={`w-full inline-flex justify-center items-center ${size} py-0 px-6 rounded-3xl font-dm text-base font-bold leading-[1] text-center ${className} ${color} ${bgColor} ${bgHoverColor} cursor-pointer transition-all duration-300 disabled:bg-[#7899e6] disabled:cursor-not-allowed`}
   onClick={onClick}
   >
      {textButton}
   </button>
