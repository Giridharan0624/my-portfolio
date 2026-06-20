'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill
} from '@/firebase/projects';
import { Skill } from '@/types';

import { SkeletonBadge } from '@/components/SkeletonLoader';

export default function SkillsTab() {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [newSkill, setNewSkill] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string } | null>(null);

    const loadSkills = async () => {
        try {
            setLoading(true);
            const fetchedSkills = await getSkills();
            setSkills(fetchedSkills);
        } catch (error) {
            console.error('Error loading skills:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSkills();
    }, []);

    const handleAddSkill = async (e: FormEvent) => {
        e.preventDefault();
        if (!newSkill.trim()) return;
        setIsSubmitting(true);

        try {
            if (editingItem) {
                await updateSkill(editingItem.id, newSkill.trim());
            } else {
                await addSkill(newSkill.trim());
            }
            setNewSkill('');
            setEditingItem(null);
            loadSkills();
        } catch (error) {
            console.error('Error saving skill:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSkill = async (skillId: string) => {
        if (!confirm('Are you sure you want to delete this skill?')) return;

        try {
            await deleteSkill(skillId);
            loadSkills();
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };

    if (loading && skills.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Manage Skills</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <SkeletonBadge />
                    <SkeletonBadge />
                    <SkeletonBadge />
                    <SkeletonBadge />
                    <SkeletonBadge />
                    <SkeletonBadge />
                </div>
            </div>
        );
    }

    return (
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
                        {isSubmitting ? 'Saving...' : editingItem ? 'Update' : 'Add Skill'}
                    </button>
                    {editingItem && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingItem(null);
                                setNewSkill('');
                            }}
                            className="px-6 py-3 bg-zinc-800 text-gray-400 font-bold rounded-xl hover:text-white transition-all uppercase tracking-widest text-xs"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            </div>

            {/* Skills List */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <div key={skill.id} className="group relative bg-zinc-900 border border-zinc-800 p-4 rounded-xl hover:border-red-600 transition-all text-center">
                            <span className="font-bold text-gray-300 group-hover:text-white transition-colors uppercase tracking-tight text-sm">{skill.name}</span>
                            <button
                                onClick={() => {
                                    setEditingItem({ id: skill.id! });
                                    setNewSkill(skill.name);
                                }}
                                className="absolute -top-2 -left-2 p-1.5 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-blue-500 border border-blue-600 shadow-xl"
                                aria-label="Edit skill"
                            >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => skill.id && handleDeleteSkill(skill.id)}
                                className="absolute -top-2 -right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:text-red-500 border border-red-600 shadow-xl"
                                aria-label="Delete skill"
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
    );
}
