import React, { useState } from 'react'
import { MockApiService } from '../../services/MockApiService'

export const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e) => {

    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const response = await MockApiService.login(email, password)
      onLoginSuccess(response.data)// Pass the logged-in user object
    } catch (err) {
      setError('Invalid email or password. Please try: admin@example.com / password')
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Login to Dashboard</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="loginEmail" className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              id="loginEmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
              placeholder="e.g., admin@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="loginPassword" className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <input
              type="password"
              id="loginPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
              placeholder="password"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors duration-200"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600 text-sm">
          <p className="mb-2">Dummy credentials:</p>
          <ul className="list-disc list-inside inline-block text-left">
            <li>Admin: **admin@example.com** / password</li>
            <li>Manager: **manager1@example.com** / password</li>
            <li>User: **user1@example.com** / password</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
// import React, { useState, useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { AuthApiService } from '../../services/AuthApiSerivce'

export const Login = ({ onLoginSuccess }) => {
  // const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("aditya@example.com");
  const [password, setPassword] = useState("aditya");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await AuthApiService.login(email, password);
      onLoginSuccess(response);
      alert(response.message)
      console.log(response)
    } catch (err) {
      setError(err.message || "Login failed");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Login to Dashboard
        </h2>
        <form className='form-control text-black' onSubmit={handleLogin}>
          <input
            type="email"
            id='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full mb-4 px-3 py-2 rounded"
            placeholder="Email"
          />
          <input
            type="password"
            id='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full mb-4 px-3 py-2 rounded"
            placeholder="Password"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};
