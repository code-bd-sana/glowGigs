import React from "react";

type ButtonProps = {
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const SecondaryButton: React.FC<ButtonProps> = ({
  text = "Click Me",
  onClick,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 md:px-14 md:py-4 text-white cursor-pointer hover:bg-[#1f1c1c] text-center mx-auto rounded-full my-2 lg:my-10 border border-black  bg-black hover:text-white transition ${className}`}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
