import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ListTodo, ShieldCheck, BarChart2, PlusCircle, Settings, UserPlus } from 'lucide-react';

const StatCard = ({ icon, label, value, change }) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md flex items-center justify-between">
    <div>
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="text-3xl font-bold text-zinc-800 dark:text-zinc-200">{value}</p>
      {change && <p className={`text-sm mt-1 ${change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{change}</p>}
    </div>
    <div className="bg-blue-100 dark:bg-blue-900/50 text-blue-500 p-4 rounded-full">
      {icon}
    </div>
  </div>
);

const QuickActionButton = ({ icon, label, to }) => (
    <Link to={to} className="flex flex-col items-center justify-center bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors">
        {icon}
        <span className="mt-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</span>
    </Link>
);

const ActivityItem = ({ user, action, time }) => (
    <div className="flex items-center space-x-4 py-3 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
        <img className="w-10 h-10 rounded-full" src={`https://i.pravatar.cc/40?u=${user}`} alt={user} />
        <div>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{action}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{time}</p>
        </div>
    </div>
);

const TaskItem = ({ title, priority }) => (
    <div className="flex items-center justify-between py-3 border-b border-zinc-200 dark:border-zinc-700 last:border-b-0">
        <p className="text-sm text-zinc-800 dark:text-zinc-200">{title}</p>
        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        priority === 'High' ? 'bg-red-100 text-red-800' : 
        priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
        'bg-green-100 text-green-800'
      }`}>
        {priority}
      </span>
    </div>
)

const AdminDashboard = () => {
  return (
    <div className="p-4 md:p-6 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Welcome back, Admin!</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Here's a snapshot of your application's status.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard icon={<Users size={24} />} label="Total Users" value="1,254" change="+12%" />
        <StatCard icon={<ListTodo size={24} />} label="Pending Tasks" value="28" change="+3" />
        <StatCard icon={<ShieldCheck size={24} />} label="System Status" value="Online" change="All systems normal" />
        <StatCard icon={<UserPlus size={24} />} label="New Sign-ups" value="42" change="this week" />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <QuickActionButton icon={<UserPlus size={32} className="text-green-500" />} label="Create New User" to="/admin/users" />
          <QuickActionButton icon={<PlusCircle size={32} className="text-blue-500" />} label="Assign a Task" to="/admin/task-manager" />
          <QuickActionButton icon={<BarChart2 size={32} className="text-purple-500" />} label="View Analytics" to="/admin/analytics" />
          <QuickActionButton icon={<Settings size={32} className="text-zinc-500" />} label="System Settings" to="/admin/system-config" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4 text-zinc-800 dark:text-zinc-200">Recent Activity</h3>
            <div>
                <ActivityItem user="alex" action="Created a new task: 'Design new dashboard'" time="2 hours ago" />
                <ActivityItem user="jane" action="Completed a task: 'Fix login bug'" time="5 hours ago" />
                <ActivityItem user="john" action="Updated user profile" time="1 day ago" />
                <ActivityItem user="sara" action="Changed system setting: 'Enable 2FA'" time="2 days ago" />
            </div>
        </div>

        {/* High-Priority Tasks */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
            <h3 className="font-bold text-lg mb-4 text-zinc-800 dark:text-zinc-200">High-Priority Tasks</h3>
            <div>
                <TaskItem title="Fix critical security vulnerability" priority="High" />
                <TaskItem title="Prepare for server migration" priority="High" />
                <TaskItem title="Review Q3 budget proposal" priority="Medium" />
            </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
