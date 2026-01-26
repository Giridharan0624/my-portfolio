'use client';

import { useState, useEffect, FormEvent } from 'react';
import { onAuthChange, signIn, signOut } from '@/firebase/auth';
import { getProjects, addProject, deleteProject, Project } from '@/firebase/projects';
import { User } from 'firebase/auth';

export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [projects, setProjects] = useState<Project[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);

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

    useEffect(() => {
        const unsubscribe = onAuthChange((currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                loadProjects();
            }
        });

        return () => unsubscribe();
    }, []);

    const loadProjects = async () => {
        try {
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoginError('');

        try {
            await signIn(email, password);
        } catch (error) {
            setLoginError('Invalid email or password');
        }
    };

    const handleLogout = async () => {
        try {
            await signOut();
            setProjects([]);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleAddProject = async (e: FormEvent) => {
        e.preventDefault();

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

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-xl text-gray-600 dark:text-gray-400">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-black dark:from-gray-900 dark:via-black dark:to-red-900 py-20">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
                            Admin Dashboard
                        </h1>

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="admin@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    placeholder="••••••••"
                                />
                            </div>

                            {loginError && (
                                <div className="p-3 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg text-sm">
                                    {loginError}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all"
                            >
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            Dashboard
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Welcome back, {user.email}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>

                {/* Add Project Button */}
                <div className="mb-8">
                    <button
                        onClick={() => setShowAddForm(!showAddForm)}
                        className="px-6 py-3 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-red-600/50 transition-all"
                    >
                        {showAddForm ? 'Cancel' : '+ Add New Project'}
                    </button>
                </div>

                {/* Add Project Form */}
                {showAddForm && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                            Add New Project
                        </h2>
                        <form onSubmit={handleAddProject} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    required
                                    placeholder="Project Title"
                                    value={newProject.title}
                                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="url"
                                    placeholder="Image URL"
                                    value={newProject.image}
                                    onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <textarea
                                required
                                rows={3}
                                placeholder="Project Description"
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="url"
                                    placeholder="GitHub URL"
                                    value={newProject.github}
                                    onChange={(e) => setNewProject({ ...newProject, github: e.target.value })}
                                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <input
                                    type="url"
                                    placeholder="Demo URL"
                                    value={newProject.demo}
                                    onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                                    className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            <input
                                type="text"
                                required
                                placeholder="Technologies (comma-separated, e.g., React, Next.js, Firebase)"
                                value={newProject.tech}
                                onChange={(e) => setNewProject({ ...newProject, tech: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />

                            <button
                                type="submit"
                                className="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Add Project
                            </button>
                        </form>
                    </div>
                )}

                {/* Projects List */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Your Projects ({projects.length})
                    </h2>

                    {projects.length > 0 ? (
                        <div className="space-y-4">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {project.tech.map((tech, index) => (
                                                <span
                                                    key={index}
                                                    className="px-2 py-1 text-xs bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => project.id && handleDeleteProject(project.id)}
                                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                            No projects yet. Add your first project above!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
