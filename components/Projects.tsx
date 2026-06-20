'use client';

import { useState } from 'react';
import ProjectCard from '@/components/ProjectCard';
import ProjectModal from '@/components/ProjectModal';
import { useScrollReveal } from '@/hooks/useScrollReveal';

import { SerializedProject } from '@/types';

interface ProjectsProps {
    id?: string;
    projects: SerializedProject[];
}


export default function Projects({ id, projects }: ProjectsProps) {
    const header = useScrollReveal<HTMLDivElement>();
    const grid = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });
    const [selectedProject, setSelectedProject] = useState<SerializedProject | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('All');

    // Extract unique technologies across all projects
    const allTechs = ['All', ...Array.from(new Set(projects.flatMap(p => p.tech || [])))];

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.tech && p.tech.includes(activeFilter));

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

                {/* Tech Filters */}
                {projects.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto animate-in fade-in duration-700">
                        {allTechs.map((tech) => (
                            <button
                                key={tech}
                                onClick={() => setActiveFilter(tech)}
                                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                                    activeFilter === tech
                                        ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(255,0,0,0.3)]'
                                        : 'bg-zinc-900/40 text-gray-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                                }`}
                            >
                                {tech}
                            </button>
                        ))}
                    </div>
                )}

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                    <div
                        ref={grid.ref}
                        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 stagger-children ${grid.isVisible ? 'revealed' : ''}`}
                    >
                        {filteredProjects.map((project) => (
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
                            {projects.length > 0 ? 'No Matching Projects' : 'No Projects Yet'}
                        </h3>
                        <p className="text-gray-400 mb-8 max-w-md mx-auto">
                            {projects.length > 0
                                ? `No projects match the selected technology: ${activeFilter}`
                                : "Projects will appear here once they're added to the database."}
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
