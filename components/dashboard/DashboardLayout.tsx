'use client';

import React from 'react';

interface DashboardLayoutProps {
    currentUserEmail: string | null;
    onLogout: () => void;
    activeTab: 'projects' | 'messages' | 'skills' | 'experience' | 'education' | 'services';
    setActiveTab: (tab: 'projects' | 'messages' | 'skills' | 'experience' | 'education' | 'services') => void;
    messageCount: number;
    children: React.ReactNode;
}

export default function DashboardLayout({
    currentUserEmail,
    onLogout,
    activeTab,
    setActiveTab,
    messageCount,
    children
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-black text-white py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 bg-zinc-900/50 p-8 rounded-3xl border border-zinc-900">
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">
                            Admin <span className="text-red-600">Dashboard</span>
                        </h1>
                        <p className="text-gray-400 font-medium">
                            Logged in as <span className="text-red-500">{currentUserEmail}</span>
                        </p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-8 py-3 bg-transparent border-2 border-zinc-800 text-zinc-400 font-bold rounded-xl hover:bg-white hover:text-black hover:border-white transition-all uppercase tracking-widest text-sm"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-4 mb-10 overflow-x-auto pb-2">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all ${activeTab === 'projects'
                            ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)]'
                            : 'bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-red-600'
                            }`}
                    >
                        Projects
                    </button>
                    <button
                        onClick={() => setActiveTab('messages')}
                        className={`px-8 py-4 rounded-xl font-black uppercase tracking-widest transition-all ${activeTab === 'messages'
                            ? 'bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,0,0.3)]'
                            : 'bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-red-600'
                            }`}
                    >
                        Messages {messageCount > 0 && <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">{messageCount}</span>}
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${activeTab === 'skills' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900/50 text-gray-400 hover:text-white border border-zinc-800'}`}
                    >
                        Skills
                    </button>
                    <button
                        onClick={() => setActiveTab('experience')}
                        className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${activeTab === 'experience' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900/50 text-gray-400 hover:text-white border border-zinc-800'}`}
                    >
                        Experience
                    </button>
                    <button
                        onClick={() => setActiveTab('education')}
                        className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${activeTab === 'education' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900/50 text-gray-400 hover:text-white border border-zinc-800'}`}
                    >
                        Education
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all duration-300 ${activeTab === 'services' ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-zinc-900/50 text-gray-400 hover:text-white border border-zinc-800'}`}
                    >
                        Services
                    </button>
                </div>

                {/* Tab Content */}
                {children}
            </div>
        </div>
    );
}
