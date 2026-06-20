'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    getProjects,
    addProject,
    deleteProject,
    updateProject,
    uploadImage
} from '@/firebase/projects';
import { Project } from '@/types';

import { SkeletonCard } from '@/components/SkeletonLoader';

export default function ProjectsTab() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [editingItem, setEditingItem] = useState<{ id: string } | null>(null);

    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        github: '',
        demo: '',
        tech: '',
    });

    const loadProjects = async () => {
        try {
            setLoading(true);
            const fetchedProjects = await getProjects();
            setProjects(fetchedProjects);
        } catch (error) {
            console.error('Error loading projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProjects();
    }, []);

    const handleAddProject = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = newProject.image;

            if (selectedFile) {
                setIsUploading(true);
                imageUrl = await uploadImage(selectedFile);
                setIsUploading(false);
            }

            const projectData = {
                title: newProject.title,
                description: newProject.description,
                image: imageUrl || '',
                github: newProject.github,
                demo: newProject.demo,
                tech: newProject.tech.split(',').map(t => t.trim()).filter(Boolean),
            };

            if (editingItem) {
                await updateProject(editingItem.id, projectData);
            } else {
                await addProject(projectData);
            }

            setNewProject({ title: '', description: '', image: '', github: '', demo: '', tech: '' });
            setSelectedFile(null);
            setShowAddForm(false);
            setEditingItem(null);
            loadProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project. Please try again.');
        } finally {
            setIsSubmitting(false);
            setIsUploading(false);
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

    if (loading && projects.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Manage Projects</h2>
                    <div className="h-10 w-32 shimmer-effect rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Add Project Section */}
            <div className="bg-zinc-900/30 border border-zinc-900 p-8 rounded-3xl">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight">
                        {editingItem ? 'Edit Project' : 'Manage Projects'}
                    </h2>
                    <button
                        onClick={() => {
                            setShowAddForm(!showAddForm);
                            if (editingItem) {
                                setEditingItem(null);
                                setNewProject({ title: '', description: '', image: '', github: '', demo: '', tech: '' });
                            }
                        }}
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
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                                    placeholder="e.g. E-commerce App"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-xs font-black text-red-500 uppercase">Project Image</label>
                                    <span className="text-[10px] text-zinc-500 uppercase font-black">Local Upload or URL</span>
                                </div>

                                <div className="space-y-4">
                                    {/* Local Upload Area */}
                                    <div
                                        className={`relative flex flex-col items-center justify-center gap-4 p-8 border-2 border-dashed rounded-2xl transition-all cursor-pointer ${isDragging ? 'border-red-600 bg-red-600/10' : 'border-zinc-800 bg-black hover:border-zinc-700'}`}
                                        onDragOver={(e) => {
                                            e.preventDefault();
                                            setIsDragging(true);
                                        }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            setIsDragging(false);
                                            const file = e.dataTransfer.files?.[0];
                                            if (file && file.type.startsWith('image/')) {
                                                setSelectedFile(file);
                                                setNewProject({ ...newProject, image: '' }); // Clear URL if file is dropped
                                            }
                                        }}
                                        onClick={() => document.getElementById('file-upload')?.click()}
                                    >
                                        <input
                                            id="file-upload"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    setSelectedFile(file);
                                                    setNewProject({ ...newProject, image: '' }); // Clear URL if file is chosen
                                                }
                                            }}
                                            className="hidden"
                                        />

                                        {!selectedFile && !newProject.image && (
                                            <div className="text-center">
                                                <div className="text-3xl mb-2">📸</div>
                                                <p className="text-sm font-bold text-gray-400">Drag & Drop Image or Click to Browse</p>
                                                <p className="text-[10px] text-zinc-600 uppercase mt-1">PNG, JPG, WEBP up to 5MB</p>
                                            </div>
                                        )}

                                        {(selectedFile || newProject.image) && (
                                            <div className="flex flex-col items-center gap-4 w-full">
                                                <div className="relative w-full aspect-video md:w-48 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                                                    <img
                                                        src={selectedFile ? URL.createObjectURL(selectedFile) : newProject.image}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-[10px] text-red-500 uppercase font-black tracking-widest">
                                                        {selectedFile ? `Selected: ${selectedFile.name}` : 'Ready for Display'}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedFile(null);
                                                            setNewProject({ ...newProject, image: '' });
                                                        }}
                                                        className="mt-2 text-[10px] text-zinc-500 hover:text-red-600 uppercase font-black transition-colors"
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* URL Input Alternative */}
                                    <div className="relative group/url">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <span className="text-zinc-600 text-[10px] uppercase font-black group-focus-within/url:text-red-500 transition-colors">URL</span>
                                        </div>
                                        <input
                                            type="url"
                                            value={newProject.image}
                                            onChange={(e) => {
                                                setNewProject({ ...newProject, image: e.target.value });
                                                if (e.target.value) setSelectedFile(null); // Clear file if URL is typed
                                            }}
                                            className="w-full pl-12 pr-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-xs text-white"
                                            placeholder="Or paste an image link here..."
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-red-500 uppercase">Project Story/Description</label>
                            <textarea
                                required
                                rows={4}
                                value={newProject.description}
                                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
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
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                                    placeholder="https://github.com/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-red-500 uppercase">Live Demo Link</label>
                                <input
                                    type="url"
                                    value={newProject.demo}
                                    onChange={(e) => setNewProject({ ...newProject, demo: e.target.value })}
                                    className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
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
                                className="w-full px-4 py-3 bg-black border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                                placeholder="React, Tailwind, etc."
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="w-full py-4 bg-white text-black font-black rounded-xl hover:bg-black hover:text-white border-2 border-white transition-all uppercase tracking-widest disabled:opacity-50"
                        >
                            {isUploading ? 'Uploading Image...' : isSubmitting ? 'Architecting...' : editingItem ? 'Update Project' : 'Deploy Project to Site'}
                        </button>
                        {editingItem && (
                            <button
                                type="button"
                                onClick={() => {
                                    setEditingItem(null);
                                    setShowAddForm(false);
                                    setNewProject({ title: '', description: '', image: '', github: '', demo: '', tech: '' });
                                }}
                                className="w-full mt-4 py-4 bg-transparent text-gray-400 font-black rounded-xl hover:text-white border-2 border-zinc-800 transition-all uppercase tracking-widest"
                            >
                                Cancel Editing
                            </button>
                        )}
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
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            setEditingItem({ id: project.id! });
                                            setNewProject({
                                                title: project.title,
                                                description: project.description,
                                                image: project.image,
                                                github: project.github,
                                                demo: project.demo,
                                                tech: project.tech.join(', '),
                                            });
                                            setShowAddForm(true);
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="p-3 text-gray-500 hover:text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all"
                                        aria-label="Edit project"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
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
    );
}
