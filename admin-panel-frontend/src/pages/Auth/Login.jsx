import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';
export const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("aditya@example.com");
  const [password, setPassword] = useState("aditya");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await login(email, password);
      toast.success(response.message)
    } catch (err) {
      setError("Login failed");
      console.error(err);
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
