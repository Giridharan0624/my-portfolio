'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    getServices,
    addService,
    deleteService,
    updateService
} from '@/firebase/projects';
import { Service } from '@/types';

import { SkeletonCard } from '@/components/SkeletonLoader';

export default function ServicesTab() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingItem, setEditingItem] = useState<{ id: string } | null>(null);

    const [newService, setNewService] = useState({
        title: '',
        description: '',
        tools: '',
    });

    const loadServices = async () => {
        try {
            setLoading(true);
            const fetchedServices = await getServices();
            setServices(fetchedServices);
        } catch (error) {
            console.error('Error loading services:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadServices();
    }, []);

    const handleAddService = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const serviceData = {
                title: newService.title,
                description: newService.description,
                tools: newService.tools.split(',').map(t => t.trim()).filter(Boolean),
            };
            if (editingItem) {
                await updateService(editingItem.id, serviceData);
            } else {
                await addService(serviceData);
            }
            setNewService({ title: '', description: '', tools: '' });
            setEditingItem(null);
            loadServices();
        } catch (error) {
            console.error('Error saving service:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteService = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;

        try {
            await deleteService(id);
            loadServices();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    if (loading && services.length === 0) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black uppercase tracking-tight">Manage Services</h2>
                </div>
                <div className="space-y-4">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Add Service Form */}
            <form onSubmit={handleAddService} className="bg-zinc-950 p-8 rounded-3xl border border-zinc-900 shadow-2xl space-y-6">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center text-sm">
                        {editingItem ? '📝' : '➕'}
                    </span>
                    {editingItem ? 'Edit Service' : 'Add New Service'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-red-500 uppercase">Service Title</label>
                        <input
                            type="text"
                            required
                            value={newService.title}
                            onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                            placeholder="e.g. Web Development"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-black text-red-500 uppercase">Tools / Technologies</label>
                        <input
                            type="text"
                            required
                            value={newService.tools}
                            onChange={(e) => setNewService({ ...newService, tools: e.target.value })}
                            className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                            placeholder="React, Next.js, Tailwind CSS"
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black text-red-500 uppercase">Description</label>
                    <textarea
                        required
                        rows={3}
                        value={newService.description}
                        onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                        className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl focus:ring-1 focus:ring-red-600 outline-none transition-all text-white"
                        placeholder="Describe what this service includes..."
                    />
                </div>
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-4 bg-red-600 text-white font-black rounded-xl hover:bg-red-700 transition-all uppercase tracking-widest disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : editingItem ? 'Update Service' : 'Add Service'}
                    </button>
                    {editingItem && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingItem(null);
                                setNewService({ title: '', description: '', tools: '' });
                            }}
                            className="px-8 py-4 bg-zinc-800 text-gray-400 font-bold rounded-xl hover:text-white transition-all uppercase tracking-widest text-xs"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Services List */}
            <div className="space-y-4">
                {services.length > 0 ? (
                    services.map((service, index) => (
                        <div key={service.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-red-600 transition-all group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <span className="text-3xl font-black text-zinc-800 group-hover:text-red-600/30 transition-colors">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <div className="flex-1">
                                        <h4 className="text-lg font-black text-white uppercase tracking-tight">{service.title}</h4>
                                        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{service.description}</p>
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {service.tools.map((tool, i) => (
                                                <span key={i} className="text-[10px] font-black uppercase tracking-tighter bg-black border border-zinc-800 px-2 py-1 text-red-500 rounded-md">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button
                                        onClick={() => {
                                            setEditingItem({ id: service.id! });
                                            setNewService({
                                                title: service.title,
                                                description: service.description,
                                                tools: service.tools.join(', '),
                                            });
                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                        }}
                                        className="p-3 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => service.id && handleDeleteService(service.id)}
                                        className="p-3 bg-red-600/10 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                        <p className="text-zinc-600 font-bold uppercase tracking-widest">No services added yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
