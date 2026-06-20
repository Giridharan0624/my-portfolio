'use client';

import { useState, FormEvent } from 'react';
import { signIn } from '@/firebase/auth';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoginError('');
        setIsSubmitting(true);

        try {
            await signIn(email, password);
        } catch (error) {
            setLoginError('Invalid email or password');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black py-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black opacity-50"></div>

            <div className="max-w-md w-full mx-4 relative z-10">
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl p-10">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">
                            Admin <span className="text-red-600">Access</span>
                        </h1>
                        <div className="w-12 h-1 bg-red-600 mx-auto"></div>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-xs font-black text-red-500 uppercase tracking-widest mb-2">
                                Administration Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-black text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                                placeholder="admin@email.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-xs font-black text-red-500 uppercase tracking-widest mb-2">
                                Secure Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-zinc-800 bg-black text-white focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>

                        {loginError && (
                            <div className="p-4 bg-red-950/50 border border-red-900 text-red-400 rounded-xl text-sm font-medium">
                                {loginError}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.3)] disabled:opacity-50"
                        >
                            {isSubmitting ? 'Authenticating...' : 'Enter Dashboard'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
