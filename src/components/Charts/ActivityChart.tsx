import React from 'react';
import { mockUsers, mockTasks } from '../../data/mockData';

interface ActivityChartProps {
  userId?: string;
}

const ActivityChart: React.FC<ActivityChartProps> = ({ userId }) => {
  const getActivityStatus = (lastUpdate: string) => {
    const daysSinceUpdate = Math.floor((Date.now() - new Date(lastUpdate).getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceUpdate >= 7) return { color: 'red', status: 'Inactive', days: daysSinceUpdate };
    if (daysSinceUpdate >= 4) return { color: 'yellow', status: 'Low Activity', days: daysSinceUpdate };
    return { color: 'green', status: 'Active', days: daysSinceUpdate };
  };

  const userTasks = userId 
    ? mockTasks.filter(task => task.assignedTo === userId)
    : mockTasks;

  const activityData = userTasks.map(task => {
    const user = mockUsers.find(u => u.id === task.assignedTo);
    const activity = getActivityStatus(task.updatedAt);
    
    return {
      taskTitle: task.title,
      userName: user?.name || 'Unknown',
      ...activity
    };
  });

  const colorClasses = {
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    green: 'bg-green-500'
  };

  const textColorClasses = {
    red: 'text-red-700',
    yellow: 'text-yellow-700', 
    green: 'text-green-700'
  };

  const bgColorClasses = {
    red: 'bg-red-50',
    yellow: 'bg-yellow-50',
    green: 'bg-green-50'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-600">Active (0-3 days)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span className="text-gray-600">Low Activity (4-6 days)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span className="text-gray-600">Inactive (7+ days)</span>
        </div>
      </div>

      <div className="space-y-3">
        {activityData.map((item, index) => (
          <div 
            key={index}
            className={`p-4 rounded-lg border ${bgColorClasses[item.color as keyof typeof bgColorClasses]} border-opacity-20`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 ${colorClasses[item.color as keyof typeof colorClasses]} rounded-full`}></div>
                <div>
                  <p className="font-medium text-gray-900">{item.taskTitle}</p>
                  <p className="text-sm text-gray-600">{item.userName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${textColorClasses[item.color as keyof typeof textColorClasses]}`}>
                  {item.status}
                </p>
                <p className="text-xs text-gray-500">
                  {item.days === 0 ? 'Today' : `${item.days} days ago`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityChart;