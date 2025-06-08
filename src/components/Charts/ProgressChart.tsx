import React from 'react';

interface ProgressChartProps {
  progress: number;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'orange' | 'red';
  showPercentage?: boolean;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  progress, 
  size = 'md', 
  color = 'blue',
  showPercentage = true 
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32'
  };

  const colorClasses = {
    blue: 'text-blue-600',
    green: 'text-emerald-600', 
    orange: 'text-orange-600',
    red: 'text-red-600'
  };

  const strokeColorClasses = {
    blue: 'stroke-blue-600',
    green: 'stroke-emerald-600',
    orange: 'stroke-orange-600', 
    red: 'stroke-red-600'
  };

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative ${sizeClasses[size]}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${strokeColorClasses[color]} transition-all duration-500 ease-out`}
        />
      </svg>
      {showPercentage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-sm font-semibold ${colorClasses[color]}`}>
            {Math.round(progress)}%
          </span>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;