import React, { useState } from 'react';
import { saveTokin } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FiEye, FiEyeOff } from "react-icons/fi";
import { logo } from '../assets'

export default function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginChek, setLoginChek] = useState(false);
  const [passwordChek, setPasswordChek] = useState(false);
  const [eye, setEye] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    setLoginChek(!login);
    setPasswordChek(!password);
    if (login && password) {
      fetch("https://testaoron.limsa.uz/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ login, password }),
      })
        .then(res => res.json())
        .then(item => {
          if (item?.success) {
            saveTokin(item.data.access_token);
            toast.success(item.data.message);
            navigate("/admin");
          } else {
            // toast.error(item.message?.message);
            setLogin("");
            setPassword("");
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="flex overflow-hidden rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Left panel accent */}
        <div className="hidden lg:flex w-1/2 bg-gray-700 items-center justify-center">
          <img src={logo} alt="Logo" className="w-52 h-auto" />

        </div>

        {/* Right panel form */}
        <div className="w-full lg:w-1/2 bg-white p-10">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Sign In</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Login */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Username</label>
              <input
                type="text"
                value={login}
                onChange={e => { setLogin(e.target.value); setLoginChek(false); }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              />
              {loginChek && <p className="mt-1 text-red-500 text-sm">Username is required</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input
                type={eye ? "text" : "password"}
                value={password}
                onChange={e => { setPassword(e.target.value); setPasswordChek(false); }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition pr-12"
              />
              <button
                type="button"
                onClick={() => setEye(!eye)}
                className="absolute right-4 top-14 transform -translate-y-1/2 text-gray-500"
              >
                {eye ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
              {passwordChek && <p className="mt-1 text-red-500 text-sm">Password is required</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg shadow-md transition transform hover:scale-105"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
