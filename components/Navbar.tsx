'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/#about', label: 'About' },
        { href: '/#services', label: 'Services' },
        { href: '/#skills', label: 'Skills' },
        { href: '/#experience', label: 'Experience' },
        { href: '/#education', label: 'Education' },
        { href: '/#projects', label: 'Projects' },
        { href: '/#contact', label: 'Contact' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-black text-white uppercase tracking-tighter hover:text-red-600 transition-colors">
                        GIRIDHARAN <span className="text-red-600">S</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-400 hover:text-white hover:tracking-widest transition-all duration-300 font-bold uppercase text-sm tracking-wider"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="md:hidden p-2 text-white hover:bg-zinc-900 rounded-xl transition-colors"
                        aria-label="Open menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Backdrop Overlay */}
            <div
                onClick={() => setIsMenuOpen(false)}
                className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            />

            {/* Mobile Menu Slide-Out Drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-50 w-80 max-w-[85vw] bg-black/95 backdrop-blur-md border-l border-zinc-900 p-6 flex flex-col transition-transform duration-300 ease-out transform md:hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Close Button & Logo */}
                <div className="flex justify-between items-center mb-10 pb-6 border-b border-zinc-900">
                    <span className="text-xl font-black text-white uppercase tracking-tighter">
                        GIRIDHARAN <span className="text-red-600">S</span>
                    </span>
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Nav Links */}
                <div className="flex flex-col space-y-3">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-4 py-3.5 text-gray-400 hover:text-white hover:bg-zinc-900/50 font-bold uppercase text-sm tracking-wider transition-all rounded-xl hover:translate-x-2"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Drawer Footer decoration */}
                <div className="mt-auto pt-6 border-t border-zinc-900 text-center">
                    <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">© 2026 Giridharan S</p>
                </div>
            </div>
        </nav>
    );
}
