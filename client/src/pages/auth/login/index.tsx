// src/components/Login.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../../redux/userSlice';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleLogin = async () => {

    toast.dismiss();
    const emailLength = email.length;
    const passLength = password.length;

    if (emailLength === 0) {
      return toast.error('Email is required');
    }
    if (passLength === 0) {
      return toast.error('Password is required');
    }
    toast.loading('Logging In');
    try {
      const response = await fetch(`${process.env.SERVER_URL}auth/login`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem('jwt', data.token)
        const response = await fetch(process.env.SERVER_URL + 'auth/get-details', {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "auth-token": sessionStorage.getItem('jwt') || ''
          },
        })
        const userData = await response.json();
        if (userData.success) {
          dispatch(login({ details: userData.details }))
        }
        if (!userData.validated) {
          dispatch(logout());
        }
        toast.dismiss();
        toast.success("Logged In")
        navigate('/');
      } else {
        toast.dismiss();
        toast.error(data.error)
      }
    } catch {
      toast.dismiss();
      toast.error("Server Error")
    }
  };
  return (
    <div className='min-h-screen grid lg:grid-cols-2 bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-darkTheme-text'>

      <div className='hidden lg:flex px-20'>
        <img className='' src="/svg/login.svg" alt="Logo" />
      </div>

      <form className=" w-3/4 h-full mx-auto flex flex-col justify-center lg:justify-start lg:pt-40" onSubmit={(e) => e.preventDefault()}>
        <h2 className="text-4xl font-semibold mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="text-black w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required={true}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="text-black w-full border rounded px-3 py-2 outline-none focus:border-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required={true}
          />
        </div>
        <button
          className="bg-blue-500 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className='mt-3'>New to Prayog? <Link to='/auth/register'>Register</Link></p>
      </form>
    </div>
  );
};

export default Login;
