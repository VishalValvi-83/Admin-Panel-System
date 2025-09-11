import React from 'react';
import { Plus, Filter } from 'lucide-react';

const TaskCard = ({ title, description, user, priority }) => (
  <div className="bg-white dark:bg-zinc-700 p-4 rounded-lg shadow-md mb-4">
    <h4 className="font-bold text-zinc-800 dark:text-zinc-200">{title}</h4>
    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">{description}</p>
    <div className="flex items-center justify-between mt-4">
      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
        priority === 'High' ? 'bg-red-100 text-red-800' : 
        priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
        'bg-green-100 text-green-800'
      }`}>
        {priority}
      </span>
      <img className="w-8 h-8 rounded-full" src={`https://i.pravatar.cc/40?u=${user}`} alt={user} />
    </div>
  </div>
);

const TaskColumn = ({ title, tasks }) => (
  <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-4 w-full md:w-1/3">
    <h3 className="font-bold text-lg text-zinc-800 dark:text-zinc-200 mb-4">{title}</h3>
    <div>
      {tasks.map(task => <TaskCard key={task.id} {...task} />)}
    </div>
  </div>
);

const TaskManager = () => {
  const tasks = {
    todo: [
      { id: 1, title: 'Design new dashboard layout', description: 'Create mockups in Figma', user: 'alex', priority: 'High' },
      { id: 2, title: 'Fix login bug on mobile', description: 'Users reporting issues on Safari', user: 'jane', priority: 'High' },
    ],
    inProgress: [
      { id: 3, title: 'Develop API for user profiles', description: 'Endpoint for fetching and updating data', user: 'john', priority: 'Medium' },
    ],
    done: [
      { id: 4, title: 'Setup CI/CD pipeline', description: 'Automate deployment process', user: 'sara', priority: 'Low' },
      { id: 5, title: 'Update documentation', description: 'Add new sections for API', user: 'mike', priority: 'Medium' },
    ]
  };

  return (
    <div className="p-4 md:p-6 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Task Management</h1>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center">
          <Plus className="mr-2" size={20} />
          Assign Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
          <Filter className="text-zinc-500" size={20} />
          <select className="bg-transparent focus:outline-none ml-2">
            <option>Filter by User</option>
            <option>Alex</option>
            <option>Jane</option>
            <option>John</option>
          </select>
        </div>
        <div className="flex items-center bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
          <Filter className="text-zinc-500" size={20} />
          <select className="bg-transparent focus:outline-none ml-2">
            <option>Filter by Priority</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
        <TaskColumn title="To Do" tasks={tasks.todo} />
        <TaskColumn title="In Progress" tasks={tasks.inProgress} />
        <TaskColumn title="Done" tasks={tasks.done} />
      </div>
    </div>
  );
};

export default TaskManager;
