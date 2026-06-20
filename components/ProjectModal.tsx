'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { SerializedProject } from '@/types';

interface ProjectModalProps {
    project: SerializedProject;
    onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    // Close when clicking outside the modal content
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 animate-modal-backdrop"
            onClick={handleBackdropClick}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md"></div>

            {/* Modal Content */}
            <div
                ref={modalRef}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar bg-zinc-950 border border-zinc-800 rounded-[32px] shadow-[0_40px_100px_rgba(220,38,38,0.15)] animate-modal-content"
            >
                {/* Back Button */}
                <button
                    onClick={onClose}
                    className="sticky top-4 left-4 z-20 ml-4 mt-4 w-10 h-10 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-2xl flex items-center justify-center text-gray-400 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 group"
                    aria-label="Close modal"
                >
                    <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                {/* Project Image */}
                <div className="relative w-full h-64 md:h-80 -mt-14 overflow-hidden">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full bg-zinc-900">
                            <span className="text-7xl">🚀</span>
                        </div>
                    )}
                    {/* Gradient fade at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="px-8 md:px-10 pb-10 -mt-12 relative z-10">
                    {/* Title */}
                    <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight mb-2">
                        {project.title}
                    </h2>

                    {/* Red accent line */}
                    <div className="w-16 h-1.5 bg-red-600 mb-6"></div>

                    {/* Description - FULL, no truncation */}
                    <div className="mb-8">
                        <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-3">About This Project</h3>
                        <p className="text-gray-300 font-medium leading-relaxed text-base">
                            {project.description}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-8">
                        <h3 className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-4">Tech Stack</h3>
                        <div className="flex flex-wrap gap-2.5">
                            {project.tech.map((tech, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-200 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-red-600/50 hover:text-white transition-all duration-300"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-6 py-3.5 bg-zinc-900 border border-zinc-700 rounded-2xl text-white font-bold uppercase text-xs tracking-widest hover:border-red-600 hover:bg-red-600/10 transition-all duration-300"
                            >
                                <svg className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                View Source
                            </a>
                        )}
                        {project.demo && (
                            <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-3 px-6 py-3.5 bg-red-600 rounded-2xl text-white font-bold uppercase text-xs tracking-widest hover:bg-red-700 hover:shadow-[0_10px_30px_rgba(220,38,38,0.3)] transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                                Live Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
