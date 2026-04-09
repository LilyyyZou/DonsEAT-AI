import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ username: email.split('@')[0] }));
        setIsLoading(false);
        navigate('/');
    }

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
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-3">Login</h2>
                        <p className="text-gray-400 font-medium">Please enter your details to login</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {/* Enter Email */}
                        <div className="group">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                                USF Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-[#ff9000] transition-colors" />
                                <input
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="username@dons.usfca.edu" 
                                    className="w-full pl-14 pr-5 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#ff9000] outline-none transition-all text-sm font-medium"
                                    required
                                />
                            </div>
                        </div>

                        {/* Enter Password */}
                        <div className="group">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1 mb-2 block">
                                Password
                                </label>
                                <Link to="/forgot-password" size-2 className="text-[10px] font-bold text-[#ff9000] hover:underline">
                                Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 size-5 text-gray-300 group-focus-within:text-[#ff9000] transition-colors" />
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Please enter your password" 
                                    className="w-full pl-14 pr-14 py-4 bg-white border border-gray-100 rounded-[1.5rem] shadow-sm focus:ring-4 focus:ring-orange-50 focus:border-[#ff9000] outline-none transition-all text-sm font-medium"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={(e) => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                </button>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full font-black py-4 rounded-[1.5rem] mt-4 shadow-lg transition-all flex items-center justify-center gap-2 group
                                ${isLoading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#ff9000] text-white hover:bg-[#e68200] hover:scale-[1.01] active:scale-[0.98] shadow-orange-100'}`}
                        >
                            {isLoading ? (
                                <div className="size-5 border-2 border-gray-300 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Login
                                    <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Sign up */}
                    <div className="mt-10 text-center">
                        <p className="text-sm font-bold text-gray-400">
                            Don't have a account?{' '}
                            <Link to="/signup" className="text-[#ff9000] hover:underline">
                            Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Login;