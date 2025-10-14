import React from "react";

type ButtonProps = {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  text = "Click Me",
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 md:px-14 md:py-4 text-black rounded-full my-2 lg:my-10 border border-black bg-transparent hover:bg-white hover:text-black transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
