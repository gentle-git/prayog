// src/components/Registration.js
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../../redux/userSlice';

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [college, setCollege] = useState('');
    const [degree, setDegree] = useState('');
    const [password, setPassword] = useState('');
    const [rollNo, setRollNo] = useState('');
    const handleRegistration = async () => {
        
        toast.remove();
        if (name.length <= 3) {
            return toast.error('Invalid Name')
        }
        if (email.length <= 3) {
            return toast.error('Invalid Email')
        }
        if (college.length <= 3) {
            return toast.error('Invalid AISHE Code')
        }
        if (!degree) {
            return toast.error('Invalid Degree')
        }
        if (password.length <= 7) {
            return toast.error('Invalid Password')
        }
        if (Number.isNaN(rollNo)) {
            return toast.error('Invalid Roll Number')
        }
        

        toast.loading('Processing Request')
        try{
            const response = await fetch(process.env.SERVER_URL + 'auth/register', {
                mode: 'cors',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, college, degree, password, rollNo })
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
            }else{
                toast.dismiss();
                toast.error(data.error)
            }
        }catch{
            toast.dismiss();
            toast.error('Server Error')
        }
    };

    return (
        <div className="min-h-screen bg-lightTheme-secondary dark:bg-darkTheme-secondary dark:text-darkTheme-text grid lg:grid-cols-2 ">

            <div className='hidden lg:flex items-center px-20'>
                <img className='' src="/svg/register.svg" alt="Logo" />
            </div>

            <form
                className="w-3/4 h-full mx-auto flex flex-col justify-center lg:justify-start lg:pt-5"
                onSubmit={(e) => e.preventDefault()}
            >
                <h2 className="text-4xl font-semibold mb-4">Registration</h2>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="rollNo">
                        Roll Number
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="text"
                        id="rollNo"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="Enter your roll number"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="college">
                        College
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="text"
                        id="text"
                        value={college}
                        onChange={(e) => setCollege(e.target.value)}
                        placeholder="Enter AISHE code of your institute"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="degree">
                        Degree
                    </label>
                    <select
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        id="degree"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                    >
                        <option value="">Select your degree</option>
                        <option value="Under Graduate">Undergraduate</option>
                        <option value="Post Graduate">Postgraduate</option>
                        <option value="Diploma">Diploma</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="degree">
                        Password
                    </label>
                    <input
                        className="w-full text-black border rounded px-3 py-2 outline-none focus:border-blue-500"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Case Sensitive"
                    />
                </div>

                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleRegistration}
                >
                    Register
                </button>
                <p className='mt-3'>Already Registered? <Link to='/auth/login'>Login</Link></p>
            </form>
        </div>
    );
};

export default Register;
