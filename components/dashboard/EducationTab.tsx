'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    getEducations,
    addEducation,
    deleteEducation,
    updateEducation
} from '@/firebase/projects';
import { Education } from '@/types';

import { SkeletonTimelineItem } from '@/components/SkeletonLoader';

export default function EducationTab() {
    const [educations, setEducations] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string } | null>(null);

    const [newEducation, setNewEducation] = useState({
        degree: '',
        school: '',
        period: '',
        description: '',
    });

    const loadEducations = async () => {
        try {
            setLoading(true);
            const fetchedEducations = await getEducations();
            setEducations(fetchedEducations);
        } catch (error) {
            console.error('Error loading educations:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadEducations();
    }, []);

    const handleAddEducation = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingItem) {
                await updateEducation(editingItem.id, newEducation);
            } else {
                await addEducation(newEducation);
            }
            setNewEducation({ degree: '', school: '', period: '', description: '' });
            setEditingItem(null);
            loadEducations();
        } catch (error) {
            console.error('Error saving education:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteEducation = async (id: string) => {
        if (!confirm('Are you sure you want to delete this education?')) return;

        try {
            await deleteEducation(id);
            loadEducations();
        } catch (error) {
            console.error('Error deleting education:', error);
        }
    };

    if (loading && educations.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Manage Education</h2>
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
            {/* Add Education Form */}
            <form onSubmit={handleAddEducation} className="bg-zinc-950 p-8 rounded-3xl border border-zinc-900 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">
                        {editingItem ? '📝' : '➕'}
                    </span>
                    {editingItem ? 'Edit Education' : 'Add New Education'}
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
                <div className="flex gap-4">
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-red-600 hover:bg-black text-white font-bold py-4 rounded-xl transition-all duration-300 uppercase tracking-widest text-sm border border-red-600 disabled:opacity-50">
                        {isSubmitting ? 'Saving...' : editingItem ? 'Update Education' : 'Add Education'}
                    </button>
                    {editingItem && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingItem(null);
                                setNewEducation({ degree: '', school: '', period: '', description: '' });
                            }}
                            className="px-8 bg-zinc-800 text-gray-400 font-bold rounded-xl hover:text-white transition-all uppercase tracking-widest text-sm"
                        >
                            Cancel
                        </button>
                    )}
                </div>
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
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingItem({ id: edu.id! });
                                        setNewEducation({
                                            degree: edu.degree,
                                            school: edu.school,
                                            period: edu.period,
                                            description: edu.description,
                                        });
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="p-3 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => edu.id && handleDeleteEducation(edu.id)}
                                    className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                        <p className="text-zinc-600 font-bold uppercase tracking-widest">No education added yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
