// components/AdminCard.tsx
import React from 'react'
import { FaBuilding, FaUserFriends, FaBriefcase, FaWpforms, FaDollarSign } from 'react-icons/fa'

interface StatCardProps {
  icon: React.ReactNode
  title: string
  value: string | number
  percentage: string
}

const StatCard: React.FC<StatCardProps> = ({ icon, title, value, percentage }) => {
  return (
    <div className="bg-white shadow-sm rounded-lg p-4 w-full sm:w-60">
      <div className="flex items-center space-x-3">
        <div className="text-white p-2 rounded-md text-xl bg-blue-500">
          {icon}
        </div>
        <div>
          <h4 className="text-sm text-gray-500">{title}</h4>
          <p className="text-xl font-semibold">{value}</p>
        </div>
      </div>
      <div className="mt-2 text-green-500 text-sm font-medium">
        ↑ {percentage} <span className="text-gray-500">vs last month</span>
      </div>
    </div>
  )
}

export default function AdminCard() {
  const stats = [
    {
      icon: <FaBuilding />,
      title: 'Total Job Poster',
      value: 1247,
      percentage: '12.5%',
      color: 'bg-blue-500'
    },
    {
      icon: <FaUserFriends />,
      title: 'Total Job Candidates',
      value: 8325,
      percentage: '8%',
      color: 'bg-green-500'
    },
    {
      icon: <FaBriefcase />,
      title: 'Total Jobs',
      value: 456,
      percentage: '15%',
      color: 'bg-purple-500'
    },
    {
      icon: <FaWpforms />,
      title: 'Total Applications',
      value: 12847,
      percentage: '23%',
      color: 'bg-orange-500'
    },
    {
      icon: <FaDollarSign />,
      title: 'Total Revenue',
      value: '$47,320',
      percentage: '23%',
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="flex justify-center flex-wrap gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white flex-1 shadow rounded-md p-4 w-full sm:w-60">
          <div className="flex items-center justify-between gap-3">
           
            <div>
              <h4 className="text-sm text-gray-500">{stat.title}</h4>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
             <div className={`p-2 rounded-md text-white text-lg ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
          <p className="text-sm text-green-500 flex justify-between mt-2 font-medium">
            <span>↑ {stat.percentage}</span> <span className="text-gray-500">vs last month</span>
          </p>
        </div>
      ))}
    </div>
  )
}
