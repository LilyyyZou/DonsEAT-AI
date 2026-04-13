import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

function Signup(){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');
        // check email
        if(!formData.email.endsWith('@dons.usfca.edu')){
            setError('Please use your USF student email (@dons.usfca.edu)');
            return;
        }
        // check password
        if(formData.password.length < 8){
            setError('Password must be at least 8 characters');
            return;
        }
        // check second password
        if(formData.password !== formData.confirmPassword){
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try{
            // Call the Python API
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                // If the backend returns an error (e.g. "Username already exists")
                throw new Error(data.detail || "Registration failed");
            }

            // Success
            const newUser = { username: formData.username, email: formData.email, role: "Dons" };
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify(newUser));
            alert(`Welcome to DonsEAT, ${formData.username}!`);
            navigate('/');
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center">
            <header className="w-full py-8 px-12 flex justify-center md:justify-start">
                <Link to="/" className="text-3xl font-black text-[#ff9000] tracking-tighter italic mr-6 cursor-pointer">
                DonsEAT
                </Link>
            </header>

            <main className="flex-1 flex item-center justify-center w-full px-6 pb-20">
                <div className="w-full max-w-md">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Join the Community</h2>
                        <p className="text-gray-400 font-medium">Create your USF student food account.</p>
                    </div>
                    {/* error */}
                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-500 p-4 rounded-2xl text-xs font-bold mb-6 flex items-center gap-2 animate-in fade-in zoom-in duration-300">
                        <AlertCircle className="size-4" /> {error}
                        </div>
                    )}
                    <form onSubmit={handleSignup} className="space-y-4">
                        {/* username */}
                        <div className="group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-[#ff9000] transition-colors" />
                                <input
                                    name="username"
                                    type="text" 
                                    value={formData.username}
                                    onChange={handleChange}
                                    placeholder="e.g. Lily" 
                                    className="w-full pl-14 pr-5 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#ff9000] outline-none transition-all text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* email */}
                        <div className="group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                                USF Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-[#ff9000] transition-colors" />
                                <input
                                    name="email"
                                    type="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="username@dons.usfca.edu" 
                                    className="w-full pl-14 pr-5 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#ff9000] outline-none transition-all text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* password */}
                        <div className="group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-[#ff9000] transition-colors" />
                                <input
                                    name="password"
                                    type="password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="At least 8 characters" 
                                    className="w-full pl-14 pr-5 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#ff9000] outline-none transition-all text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* confirm password */}
                        <div className="group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-[#ff9000] transition-colors" />
                                <input
                                    name="confirmPassword"
                                    type="password" 
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Repeat your password" 
                                    className="w-full pl-14 pr-5 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#ff9000] outline-none transition-all text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-black py-4 rounded-[1.5rem] mt-6 transition-all flex items-center justify-center gap-2 group
                                ${isLoading ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 shadow-xl'}`}
                        >
                            {isLoading ? (
                                <div className="size-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                            ) : (
                                <>Create Account <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" /></>
                            )}
                        </button>
                    </form>

                    {/* already a user */}
                    <div className="mt-10 text-center">
                        <p className="text-sm font-bold text-gray-400">
                            Already have a account?{' '}
                            <Link to="/signup" className="text-[#ff9000] hover:underline">
                            Login
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Signup;