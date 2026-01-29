'use client';

import { useState, useEffect, FormEvent } from 'react';
import { onAuthChange, signIn, signOut, useAuth } from '@/firebase/auth';
import {
    getProjects,
    addProject,
    deleteProject,
    Project,
    getMessages,
    deleteMessage,
    Message,
    getSkills,
    addSkill,
    deleteSkill,
    Skill,
    Experience,
    getExperiences,
    addExperience,
    deleteExperience,
    Education,
    getEducations,
    addEducation,
    deleteEducation
} from '@/firebase/projects';
import { useRouter } from 'next/navigation';
import { Timestamp } from 'firebase/firestore';

export default function Dashboard() {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'skills' | 'experience' | 'education'>('projects');

    // Data
    const [projects, setProjects] = useState<Project[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [educations, setEducations] = useState<Education[]>([]);

    // UI State
    const [showAddForm, setShowAddForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Login form
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    // Add project form
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        github: '',
        demo: '',
        tech: '',
    });

    // Add skill form
    const [newSkill, setNewSkill] = useState('');

    // Add experience form
    const [newExperience, setNewExperience] = useState({
        role: '',
        company: '',
        period: '',
        description: '',
    });

    // Add education form
    const [newEducation, setNewEducation] = useState({
        degree: '',
        school: '',
        period: '',
        description: '',
    });

    useEffect(() => {
        if (!loading && !currentUser) {
            router.push('/login');
        }
        if (currentUser) {
            loadProjects();
            loadMessages();
            loadSkills();
            loadExperiences();
            loadEducations();
        }
    }, [currentUser, loading, router]);

    const loadProjects = async () => {
        try {
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const loadMessages = async () => {
        try {
            const fetchedMessages = await getMessages();
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    const loadSkills = async () => {
        try {
            const fetchedSkills = await getSkills();
            setSkills(fetchedSkills);
        } catch (error) {
            console.error('Error loading skills:', error);
        }
    };

    const loadExperiences = async () => {
        try {
            const fetchedExperiences = await getExperiences();
            setExperiences(fetchedExperiences);
        } catch (error) {
            console.error('Error loading experiences:', error);
        }
    };

    const loadEducations = async () => {
        try {
            const fetchedEducations = await getEducations();
            setEducations(fetchedEducations);
        } catch (error) {
            console.error('Error loading educations:', error);
        }
    };

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

    const handleLogout = async () => {
        try {
            await signOut();
            setProjects([]);
            setMessages([]);
            setSkills([]);
            setExperiences([]);
            setEducations([]);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleAddProject = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await addProject({
                title: newProject.title,
                description: newProject.description,
                image: newProject.image,
                github: newProject.github,
                demo: newProject.demo,
                tech: newProject.tech.split(',').map(t => t.trim()),
            });

            setNewProject({ title: '', description: '', image: '', github: '', demo: '', tech: '' });
            setShowAddForm(false);
            loadProjects();
        } catch (error) {
            console.error('Error adding project:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProject = async (projectId: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            await deleteProject(projectId);
            loadProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleDeleteMessage = async (messageId: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            await deleteMessage(messageId);
            loadMessages();
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const handleAddSkill = async (e: FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) return;
        setIsSubmitting(true);

        try {
            await addSkill(newSkill.trim());
            setNewSkill('');
            loadSkills();
        } catch (error) {
            console.error('Error adding skill:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSkill = async (skillId: string) => {
        if (confirm('Are you sure you want to delete this skill?')) {
            try {
                await deleteSkill(skillId);
                loadSkills();
            } catch (error) {
                console.error('Error deleting skill:', error);
            }
        }
    };

    const handleAddExperience = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addExperience(newExperience);
            setNewExperience({ role: '', company: '', period: '', description: '' });
            loadExperiences();
        } catch (error) {
            console.error('Error adding experience:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteExperience = async (id: string) => {
        if (confirm('Are you sure you want to delete this experience?')) {
            try {
                await deleteExperience(id);
                loadExperiences();
            } catch (error) {
                console.error('Error deleting experience:', error);
            }
        }
    };

    const handleAddEducation = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await addEducation(newEducation);
            setNewEducation({ degree: '', school: '', period: '', description: '' });
            loadEducations();
        } catch (error) {
            console.error('Error adding education:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteEducation = async (id: string) => {
        if (confirm('Are you sure you want to delete this education?')) {
            try {
                await deleteEducation(id);
                loadEducations();
            } catch (error) {
                console.error('Error deleting education:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-xl text-red-600 font-bold animate-pulse uppercase tracking-widest">Loading Dashboard...</div>
            </div>
        );
    }

    if (!currentUser) {
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
                            Logged in as <span className="text-red-500">{currentUser.email}</span>
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
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
                        Messages {messages.length > 0 && <span className="ml-2 bg-black text-white text-xs px-2 py-1 rounded-full">{messages.length}</span>}
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
                </div>

                {/* Tab Content */}
                {activeTab === 'projects' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Add Project Section */}
                        <div className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-black uppercase tracking-tight">Manage Projects</h2>
                                <button
                                    onClick={() => setShowAddForm(!showAddForm)}
                                    className="px-6 py-2 bg-red-600/10 text-red-500 border border-red-600/20 font-bold rounded-full hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest text-xs"
                                >
                                    {showAddForm ? 'Close Form' : '+ New project'}
                                </button>
                            </div>

                            {showAddForm && (
                                <form onSubmit={handleAddProject} className="space-y-6 bg-zinc-900 p-8 rounded-2xl border border-zinc-800 mb-8 animate-in slide-in-from-top-4 duration-300">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-red-500 uppercase">Project Name</label>
                                            <input
                                                type="text"
                                                required
                                                value={newProject.title}
                                                onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                                placeholder="e.g. E-commerce App"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-red-500 uppercase">Cover Image URL</label>
                                            <input
                                                type="url"
                                                value={newProject.image}
                                                onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                                placeholder="https://..."
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-red-500 uppercase">Project Story/Description</label>
                                        <textarea
                                            required
                                            rows={4}
                                            value={newProject.description}
                                            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                            placeholder="Tell the story of this build..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-red-500 uppercase">GitHub Repository</label>
                                            <input
                                                type="url"
                                                value={newProject.github}
                                                onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                                placeholder="https://github.com/..."
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-red-500 uppercase">Live Demo Link</label>
                                            <input
                                                type="url"
                                                value={newProject.demo}
                                                onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                                placeholder="https://demo.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-red-500 uppercase">Technologies Used</label>
                                        <input
                                            type="text"
                                            required
                                            value={newProject.tech}
                                            onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                                            className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all"
                                            placeholder="React, Tailwind, etc."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-black hover:text-white border-2 border-white transition-all uppercase tracking-widest"
                                    >
                                        {isSubmitting ? 'Architecting...' : 'Deploy Project to Site'}
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div key={project.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl group hover:border-red-600 transition-all">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-xl font-black uppercase tracking-tight">{project.title}</h3>
                                            <button
                                                onClick={() => project.id && handleDeleteProject(project.id)}
                                                className="p-3 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                aria-label="Delete project"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tech.map((t, i) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-tighter bg-black border border-zinc-800 px-2 py-1 text-red-500 rounded-md">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="md:col-span-2 text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                                    <p className="text-zinc-600 font-bold uppercase tracking-widest">The portfolio is currently empty</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'messages' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Messages Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Inbox <span className="text-red-600">({messages.length})</span></h2>
                            <button
                                onClick={loadMessages}
                                className="p-3 text-red-500 hover:bg-red-500/10 rounded-full transition-all"
                                title="Refresh messages"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </button>
                        </div>

                        {/* Messages List */}
                        <div className="space-y-6">
                            {messages.length > 0 ? (
                                messages.map((msg) => (
                                    <div key={msg.id} className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl relative group hover:border-red-600 transition-all shadow-lg">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                                            <div>
                                                <h3 className="text-lg font-black uppercase tracking-widest text-white">{msg.name}</h3>
                                                <p className="text-red-500 font-bold text-xs mt-1">{msg.email}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                                                    {msg.createdAt?.toDate().toLocaleDateString()} at {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                                <button
                                                    onClick={() => msg.id && handleDeleteMessage(msg.id)}
                                                    className="p-3 bg-black border border-zinc-800 text-gray-500 hover:text-red-600 hover:border-red-600 rounded-xl transition-all"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="bg-black/40 border-l-4 border-red-600 p-6 rounded-r-xl">
                                            <p className="text-gray-300 leading-relaxed font-medium whitespace-pre-wrap">{msg.message}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-32 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                                    <div className="text-zinc-800 text-6xl mb-6">📭</div>
                                    <p className="text-zinc-600 font-bold uppercase tracking-widest">Your inbox is silent</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Skills Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black uppercase tracking-tight">Manage <span className="text-red-600">Skills</span></h2>
                        </div>

                        {/* Add Skill Form */}
                        <div className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl">
                            <form onSubmit={handleAddSkill} className="flex gap-4">
                                <input
                                    type="text"
                                    required
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    className="flex-1 px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                                    placeholder="Add a new skill (e.g. Next.js, Docker, AWS)"
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.3)] disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Skill'}
                                </button>
                            </form>
                        </div>

                        {/* Skills List */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {skills.length > 0 ? (
                                skills.map((skill) => (
                                    <div key={skill.id} className="group relative bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-red-600 transition-all text-center">
                                        <span className="font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-tight text-sm">{skill.name}</span>
                                        <button
                                            onClick={() => skill.id && handleDeleteSkill(skill.id)}
                                            className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-red-500 border border-red-600 shadow-xl"
                                        >
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                                    <p className="text-zinc-600 font-bold uppercase tracking-widest">No skills added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'experience' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Add Experience Form */}
                        <form onSubmit={handleAddExperience} className="bg-zinc-950 p-8 rounded-3xl border border-zinc-900 shadow-2xl space-y-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">➕</span>
                                Add New Experience
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Role (e.g., Full Stack Developer)"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-wider text-sm font-medium"
                                    value={newExperience.role}
                                    onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Company"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-wider text-sm font-medium"
                                    value={newExperience.company}
                                    onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Period (e.g., 2022 - PRESENT)"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-wider text-sm font-medium"
                                    value={newExperience.period}
                                    onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Description"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors h-32 uppercase tracking-wider text-sm font-medium"
                                value={newExperience.description}
                                onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                                required
                            />
                            <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-black text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm border border-red-600 disabled:opacity-50">
                                {isSubmitting ? 'Adding...' : 'Add Experience'}
                            </button>
                        </form>

                        {/* Experience List */}
                        <div className="grid grid-cols-1 gap-6">
                            {experiences.length > 0 ? (
                                experiences.map((exp) => (
                                    <div key={exp.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex justify-between items-center group hover:border-red-600 transition-all">
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wider">{exp.role}</h4>
                                            <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-widest">{exp.company} • {exp.period}</p>
                                        </div>
                                        <button
                                            onClick={() => exp.id && handleDeleteExperience(exp.id)}
                                            className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                                    <p className="text-zinc-600 font-bold uppercase tracking-widest">No experience added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'education' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Add Education Form */}
                        <form onSubmit={handleAddEducation} className="bg-zinc-950 p-8 rounded-3xl border border-zinc-900 shadow-2xl space-y-6">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">➕</span>
                                Add New Education
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input
                                    type="text"
                                    placeholder="Degree (e.g., Bachelor of Computer Science)"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-wider text-sm font-medium"
                                    value={newEducation.degree}
                                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="School"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-wider text-sm font-medium"
                                    value={newEducation.school}
                                    onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Period (e.g., 2016 - 2020)"
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors uppercase tracking-wider text-sm font-medium"
                                    value={newEducation.period}
                                    onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
                                    required
                                />
                            </div>
                            <textarea
                                placeholder="Description"
                                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-red-600 transition-colors h-32 uppercase tracking-wider text-sm font-medium"
                                value={newEducation.description}
                                onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                                required
                            />
                            <button type="submit" disabled={isSubmitting} className="w-full bg-red-600 hover:bg-black text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm border border-red-600 disabled:opacity-50">
                                {isSubmitting ? 'Adding...' : 'Add Education'}
                            </button>
                        </form>

                        {/* Education List */}
                        <div className="grid grid-cols-1 gap-6">
                            {educations.length > 0 ? (
                                educations.map((edu) => (
                                    <div key={edu.id} className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex justify-between items-center group hover:border-red-600 transition-all">
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wider">{edu.degree}</h4>
                                            <p className="text-red-500 text-xs font-bold mt-1 uppercase tracking-widest">{edu.school} • {edu.period}</p>
                                        </div>
                                        <button
                                            onClick={() => edu.id && handleDeleteEducation(edu.id)}
                                            className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                                    <p className="text-zinc-600 font-bold uppercase tracking-widest">No education added yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
