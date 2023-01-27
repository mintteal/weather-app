import React from 'react';

interface ButtonProps {
  onClick?: React.MouseEventHandler;
  icon?: React.SVGProps<SVGElement>;
  text: string;
  variant?: string;
}

const Button = ({ onClick, icon, text, variant = 'default' }: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      <>
        {icon}
        {text}
      </>
    </button>
  );
};

export default Button;
