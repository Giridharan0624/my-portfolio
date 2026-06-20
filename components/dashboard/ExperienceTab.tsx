'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    getExperiences,
    addExperience,
    deleteExperience,
    updateExperience
} from '@/firebase/projects';
import { Experience } from '@/types';

import { SkeletonTimelineItem } from '@/components/SkeletonLoader';

export default function ExperienceTab() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string } | null>(null);

    const [newExperience, setNewExperience] = useState({
        role: '',
        company: '',
        period: '',
        description: '',
    });

    const loadExperiences = async () => {
        try {
            setLoading(true);
            const fetchedExperiences = await getExperiences();
            setExperiences(fetchedExperiences);
        } catch (error) {
            console.error('Error loading experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadExperiences();
    }, []);

    const handleAddExperience = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingItem) {
                await updateExperience(editingItem.id, newExperience);
            } else {
                await addExperience(newExperience);
            }
            setNewExperience({ role: '', company: '', period: '', description: '' });
            setEditingItem(null);
            loadExperiences();
        } catch (error) {
            console.error('Error saving experience:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteExperience = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;

        try {
            await deleteExperience(id);
            loadExperiences();
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    };

    if (loading && experiences.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Manage Experience</h2>
                </div>
                <div className="space-y-4">
                    <SkeletonTimelineItem />
                    <SkeletonTimelineItem />
                    <SkeletonTimelineItem />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Add Experience Form */}
            <form onSubmit={handleAddExperience} className="bg-zinc-950 p-8 rounded-3xl border border-zinc-900 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">
                        {editingItem ? '📝' : '➕'}
                    </span>
                    {editingItem ? 'Edit Experience' : 'Add New Experience'}
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
                <div className="flex gap-4">
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-red-600 hover:bg-black text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm border border-red-600 disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : editingItem ? 'Update Experience' : 'Add Experience'}
                    </button>
                    {editingItem && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingItem(null);
                                setNewExperience({ role: '', company: '', period: '', description: '' });
                            }}
                            className="px-8 bg-zinc-800 text-gray-400 font-bold rounded-xl hover:text-white transition-all uppercase tracking-widest text-sm"
                        >
                            Cancel
                        </button>
                    )}
                </div>
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
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingItem({ id: exp.id! });
                                        setNewExperience({
                                            role: exp.role,
                                            company: exp.company,
                                            period: exp.period,
                                            description: exp.description,
                                        });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-3 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => exp.id && handleDeleteExperience(exp.id)}
                                    className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                        <p className="text-zinc-600 font-bold uppercase tracking-widest">No experience added yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
