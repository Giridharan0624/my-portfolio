'use client';

import { useState, FormEvent } from 'react';
import { addMessage } from '@/firebase/projects';

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            await addMessage(formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Failed to send message');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="relative group">
                <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-widest ${
                        focusedField === 'name' || formData.name
                            ? '-top-2.5 text-[10px] text-red-500 bg-zinc-950 px-2'
                            : 'top-4 text-xs text-gray-500'
                    }`}
                >
                    Your Name
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl text-white font-medium focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all duration-300 outline-none placeholder-transparent"
                    placeholder="Your name"
                    disabled={status === 'loading'}
                />
            </div>

            {/* Email Field */}
            <div className="relative group">
                <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-widest ${
                        focusedField === 'email' || formData.email
                            ? '-top-2.5 text-[10px] text-red-500 bg-zinc-950 px-2'
                            : 'top-4 text-xs text-gray-500'
                    }`}
                >
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl text-white font-medium focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all duration-300 outline-none placeholder-transparent"
                    placeholder="your.email@example.com"
                    disabled={status === 'loading'}
                />
            </div>

            {/* Message Field */}
            <div className="relative group">
                <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none font-bold uppercase tracking-widest ${
                        focusedField === 'message' || formData.message
                            ? '-top-2.5 text-[10px] text-red-500 bg-zinc-950 px-2'
                            : 'top-4 text-xs text-gray-500'
                    }`}
                >
                    Your Message
                </label>
                <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full px-4 py-4 bg-zinc-900/50 border-2 border-zinc-800 rounded-2xl text-white font-medium focus:border-red-600 focus:shadow-[0_0_20px_rgba(220,38,38,0.1)] transition-all duration-300 outline-none resize-none placeholder-transparent"
                    placeholder="Your message..."
                    disabled={status === 'loading'}
                />
            </div>

            {/* Status Messages */}
            {status === 'success' && (
                <div className="p-4 bg-red-600/10 border border-red-600/30 text-red-400 rounded-2xl font-bold text-sm flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600/20 rounded-xl flex items-center justify-center text-lg">✓</span>
                    Message sent successfully! I&apos;ll get back to you soon.
                </div>
            )}

            {status === 'error' && (
                <div className="p-4 bg-red-900/20 border border-red-800/30 text-red-400 rounded-2xl font-bold text-sm flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-900/30 rounded-xl flex items-center justify-center text-lg">✕</span>
                    {errorMessage}
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={status === 'loading'}
                className="group relative w-full py-4 bg-red-600 text-white font-black uppercase tracking-widest rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-[0_10px_40px_rgba(220,38,38,0.4)] disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
            >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                    {status === 'loading' ? (
                        <>
                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </span>
            </button>
        </form>
    );
}
