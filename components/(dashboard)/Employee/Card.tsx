// components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 w-[360px] h-[130px] rounded-lg shadow flex items-center gap-2 space-x-4">
      {icon && <div className="text-2xl">{icon}</div>}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="font-bold text-xl">{value}</p>
      </div>
    </div>
  );
};

export default Card;
