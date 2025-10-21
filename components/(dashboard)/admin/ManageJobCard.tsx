import React, { JSX } from 'react';
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaThumbsUp,
  FaTimesCircle,
  FaUserFriends,
} from 'react-icons/fa';

interface CardItem {
  icon: JSX.Element;
  label: string;
  count: number;
  bgColor: string;
}

const ManageJobCard: React.FC = () => {
  const cards: CardItem[] = [
    {
      icon: <FaClipboardList className="text-blue-500 text-xl" />,
      label: 'Total Jobs',
      count: 8,
      bgColor: 'bg-blue-50',
    },
    {
      icon: <FaCheckCircle className="text-green-500 text-xl" />,
      label: 'Active',
      count: 3,
      bgColor: 'bg-green-50',
    },
    {
      icon: <FaClock className="text-yellow-500 text-xl" />,
      label: 'Pending',
      count: 2,
      bgColor: 'bg-yellow-50',
    },
    {
      icon: <FaThumbsUp className="text-blue-400 text-xl" />,
      label: 'Approved',
      count: 2,
      bgColor: 'bg-blue-50',
    },
    {
      icon: <FaTimesCircle className="text-red-500 text-xl" />,
      label: 'Rejected',
      count: 1,
      bgColor: 'bg-red-50',
    },
    {
      icon: <FaUserFriends className="text-purple-500 text-xl" />,
      label: 'Total Applicants',
      count: 212,
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <div className="md:flex flex-wrap justify-center gap-4 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`mt-4 md:mt-0 flex-1 bg-white rounded-lg shadow-sm p-4 text-center `}
        >
          <div className={`mb-2 flex justify-center`}>   <span className={`${card.bgColor} p-3 rounded`}>{card.icon}</span> </div>
          <h6 className="text-2xl font-bold">{card.count}</h6>
          <p className="text-sm text-[#6B7280]">{card.label}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageJobCard;
