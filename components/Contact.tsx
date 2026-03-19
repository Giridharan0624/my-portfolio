'use client';

import ContactForm from '@/components/ContactForm';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Contact({ id }: { id?: string }) {
    const header = useScrollReveal<HTMLDivElement>();
    const form = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
    const social = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });

    return (
        <section id={id} className="py-24 bg-black relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-[120px] float-glow"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-900/15 rounded-full blur-[150px] float-glow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[200px]"></div>
            </div>

            {/* Background watermark */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02]">
                <h2 className="text-[250px] font-black uppercase tracking-tighter transform rotate-6">CONTACT</h2>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div
                    ref={header.ref}
                    className={`text-center mb-16 reveal-up ${header.isVisible ? 'revealed' : ''}`}
                >
                    <h2 className="text-12xl md:text-[100px] font-black text-white/[0.03] uppercase leading-none absolute left-0 right-0 -top-8 select-none pointer-events-none tracking-tighter">
                        CONTACT
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight relative">
                        Let&apos;s <span className="text-red-600">Connect</span>
                    </h3>
                    <p className="text-gray-400 text-lg mt-4 max-w-xl mx-auto">
                        Have a project in mind or want to collaborate? Drop me a message.
                    </p>
                    <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
                </div>

                {/* Main Content - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    {/* Left - Contact Info Cards */}
                    <div
                        ref={social.ref}
                        className={`lg:col-span-2 flex flex-col gap-6 reveal-left ${social.isVisible ? 'revealed' : ''}`}
                    >
                        {/* Email Card */}
                        <a
                            href="mailto:giricoder.dev@gmail.com"
                            className="group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-6 rounded-3xl hover:border-red-600 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.15)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600/20 group-hover:scale-110 transition-all duration-300">
                                    <span className="text-2xl">✉️</span>
                                </div>
                                <p className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-1">Email</p>
                                <p className="text-white font-bold group-hover:text-red-400 transition-colors">giricoder.dev@gmail.com</p>
                            </div>
                        </a>

                        {/* GitHub Card */}
                        <a
                            href="https://github.com/Giridharan0624"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-6 rounded-3xl hover:border-red-600 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.15)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600/20 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                </div>
                                <p className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-1">GitHub</p>
                                <p className="text-white font-bold group-hover:text-red-400 transition-colors">Giridharan0624</p>
                            </div>
                        </a>

                        {/* LinkedIn Card */}
                        <a
                            href="https://www.linkedin.com/in/giridharan0624/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800 p-6 rounded-3xl hover:border-red-600 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(220,38,38,0.15)] overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-600/20 group-hover:scale-110 transition-all duration-300">
                                    <svg className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </div>
                                <p className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-1">LinkedIn</p>
                                <p className="text-white font-bold group-hover:text-red-400 transition-colors">giridharan0624</p>
                            </div>
                        </a>
                    </div>

                    {/* Right - Contact Form */}
                    <div
                        ref={form.ref}
                        className={`lg:col-span-3 relative reveal-right ${form.isVisible ? 'revealed' : ''}`}
                    >
                        {/* Glowing border effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-b from-red-600/30 via-red-600/10 to-zinc-800/50 rounded-[36px] blur-[1px]"></div>
                        <div className="relative bg-zinc-950/90 backdrop-blur-xl p-8 md:p-10 rounded-[35px] border border-zinc-800/50">
                            {/* Corner accent */}
                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 blur-[40px] rounded-full -mr-8 -mt-8"></div>

                            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                                Send a <span className="text-red-600">Message</span>
                            </h3>
                            <p className="text-sm text-gray-500 mb-8">I&apos;ll get back to you as soon as possible.</p>

                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
