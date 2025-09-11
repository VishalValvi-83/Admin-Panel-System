import React from 'react'

const Stat = () => {
    return (
        <div className="container mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Users</h2>
                    <p className="text-3xl font-bold text-blue-600">10,492</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 12% from last month</p>
                </div>
                {/* <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Revenue</h2>
                    <p className="text-3xl font-bold text-green-600">$84,320</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 8% from last month</p>
                </div> */}
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Active Projects</h2>
                    <p className="text-3xl font-bold text-purple-600">23</p>
                    <p className="text-sm text-gray-500 mt-2">↓ 2 from last month</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Tasks Completed</h2>
                    <p className="text-3xl font-bold text-orange-600">1,342</p>
                    <p className="text-sm text-gray-500 mt-2">↑ 18% from last month</p>
                </div>
            </div>
        </div>
    )
}

export default Stat