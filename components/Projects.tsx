'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface SerializedProject {
    id?: string;
    title: string;
    description: string;
    image: string;
    github: string;
    demo: string;
    tech: string[];
    createdAt: number;
}

interface ProjectsProps {
    id?: string;
    projects: SerializedProject[];
}

export default function Projects({ id, projects }: ProjectsProps) {
    const header = useScrollReveal<HTMLDivElement>();
    const grid = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
    const [selectedProject, setSelectedProject] = useState<SerializedProject | null>(null);

    return (
        <section id={id} className="min-h-screen bg-black py-20 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div
                    ref={header.ref}
                    className={`text-center mb-16 reveal-up ${header.isVisible ? 'revealed' : ''}`}
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 uppercase tracking-tight">
                        Selected <span className="text-red-600">Works</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto mt-6"></div>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div
                        ref={grid.ref}
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 stagger-children ${grid.isVisible ? 'revealed' : ''}`}
                    >
                        {projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => setSelectedProject(project)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-24 bg-zinc-900/30 border border-zinc-800 rounded-lg">
                        <div className="text-red-600 text-6xl mb-6">⚠️</div>
                        <h3 className="text-2xl font-bold text-white mb-2 uppercase">
                            No Projects Yet
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            Projects will appear here once they&apos;re added to the database.
                        </p>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </section>
    );
}
