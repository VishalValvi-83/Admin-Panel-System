import React, { useState } from 'react';
import { Settings, Shield, Bell } from 'lucide-react';

const Toggle = ({ label, description, enabled, setEnabled }) => (
  <div className="flex items-center justify-between py-4 border-b border-zinc-200 dark:border-zinc-700">
    <div>
      <p className="font-medium text-zinc-800 dark:text-zinc-200">{label}</p>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
    <button 
      onClick={() => setEnabled(!enabled)}
      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
        enabled ? 'bg-blue-500' : 'bg-zinc-300 dark:bg-zinc-600'
      }`}>
      <span className={`inline-block w-5 h-5 bg-white rounded-full transform transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`} />
    </button>
  </div>
);

const GeneralSettings = () => {
    const [registrations, setRegistrations] = useState(true);
    const [maintenance, setMaintenance] = useState(false);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">General Settings</h2>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Application Name</label>
                    <input type="text" defaultValue="Admin Panel Pro" className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 rounded-md border border-zinc-300 dark:border-zinc-600" />
                </div>
                <Toggle label="Enable User Registrations" description="Allow new users to sign up" enabled={registrations} setEnabled={setRegistrations} />
                <Toggle label="Maintenance Mode" description="Temporarily disable access to the site for users" enabled={maintenance} setEnabled={setMaintenance} />
                <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
            </div>
        </div>
    );
};

const SecuritySettings = () => {
    const [twoFactor, setTwoFactor] = useState(false);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Security Settings</h2>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">Password Policy</label>
                    <select className="w-full p-2 bg-zinc-100 dark:bg-zinc-700 rounded-md border border-zinc-300 dark:border-zinc-600">
                        <option>Standard (8+ characters)</option>
                        <option>Strong (12+ characters, includes numbers and symbols)</option>
                    </select>
                </div>
                <Toggle label="Enable Two-Factor Authentication (2FA)" description="Add an extra layer of security to user accounts" enabled={twoFactor} setEnabled={setTwoFactor} />
                <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
            </div>
        </div>
    );
};

const NotificationSettings = () => {
    const [emailNewTask, setEmailNewTask] = useState(true);
    const [emailStatusUpdate, setEmailStatusUpdate] = useState(true);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Notification Settings</h2>
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-lg shadow-md">
                <Toggle label="Email on New Task Assignment" description="Send an email to users when they are assigned a new task" enabled={emailNewTask} setEnabled={setEmailNewTask} />
                <Toggle label="Email on Task Status Update" description="Notify users when the status of their tasks changes" enabled={emailStatusUpdate} setEnabled={setEmailStatusUpdate} />
                <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Save Changes</button>
            </div>
        </div>
    );
};

const SystemConfiguration = () => {
    const [activeTab, setActiveTab] = useState('general');

    const tabs = [
        { id: 'general', label: 'General', icon: <Settings size={20} /> },
        { id: 'security', label: 'Security', icon: <Shield size={20} /> },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    ];

    return (
        <div className="p-4 md:p-6 bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">System Configuration</h1>
            </div>

            <div className="flex space-x-6 border-b border-zinc-300 dark:border-zinc-700 mb-6">
                {tabs.map(tab => (
                    <button 
                        key={tab.id} 
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
                            activeTab === tab.id 
                                ? 'border-blue-500 text-blue-500' 
                                : 'border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                        }`}>
                        {tab.icon}
                        <span className="font-medium">{tab.label}</span>
                    </button>
                ))}
            </div>

            <div>
                {activeTab === 'general' && <GeneralSettings />}
                {activeTab === 'security' && <SecuritySettings />}
                {activeTab === 'notifications' && <NotificationSettings />}
            </div>
        </div>
    );
};

export default SystemConfiguration;
