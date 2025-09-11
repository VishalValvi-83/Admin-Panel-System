import React from 'react';
import { Users, Activity, CheckCircle, BarChart2, LineChart, PieChart, Clock } from 'lucide-react';

const StatCard = ({ icon, label, value, change }) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-200">{value}</p>
      <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>
    </div>
    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-500 p-4 rounded-full">
      {icon}
    </div>
  </div>
);

const ChartPlaceholder = ({ title, icon, type }) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="font-bold text-lg ml-2 text-zinc-800 dark:text-zinc-200">{title}</h3>
    </div>
    <div className="h-64 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex items-center justify-center">
      <p className="text-zinc-400">{type} Chart Placeholder</p>
    </div>
  </div>
);

const ActivityItem = ({ user, action, time }) => (
    <div className="flex items-center space-x-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
        <img className="w-10 h-10 rounded-full" src={`https://i.pravatar.cc/40?u=${user}`} alt={user} />
        <div>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{action}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{time}</p>
        </div>
    </div>
);

const AnalyticsDashboard = () => {
  return (
    <div className="p-4 md:p-6 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard icon={<Users size={24} />} label="Total Users" value="1,254" change="+12% this month" />
        <StatCard icon={<Activity size={24} />} label="Active Tasks" value="82" change="+5.4% this week" />
        <StatCard icon={<CheckCircle size={24} />} label="Completed Tasks" value="543" change="+2.1% this week" />
        <StatCard icon={<Clock size={24} />} label="Avg. Task Time" value="3.2 Days" change="-0.5% this month" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartPlaceholder title="User Registrations" icon={<LineChart size={24} />} type="Line" />
        <ChartPlaceholder title="Tasks by Status" icon={<BarChart2 size={24} />} type="Bar" />
      </div>

      {/* Lower Grid with Pie Chart and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
            <ChartPlaceholder title="User Role Distribution" icon={<PieChart size={24} />} type="Pie" />
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4 text-zinc-800 dark:text-zinc-200">Recent Activity</h3>
            <div>
                <ActivityItem user="alex" action="Created a new task: 'Design new dashboard'" time="2 hours ago" />
                <ActivityItem user="jane" action="Completed a task: 'Fix login bug'" time="5 hours ago" />
                <ActivityItem user="john" action="Updated user profile" time="1 day ago" />
                <ActivityItem user="sara" action="Changed system setting: 'Enable 2FA'" time="2 days ago" />
            </div>
        </div>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;
