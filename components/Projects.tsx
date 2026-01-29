import ProjectCard from '@/components/ProjectCard';
import { Project } from '@/firebase/projects';
import Link from 'next/link';

interface ProjectsProps {
    id?: string;
    projects: Project[];
}

export default function Projects({ id, projects }: ProjectsProps) {
    return (
        <section id={id} className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        My Projects
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        A collection of my recent work and side projects
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-black mx-auto mt-6"></div>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {projects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </div>

                        {/* Dashboard Link (Only visible to admin ideally, but kept for now) */}
                        <div className="text-center">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 transition-all font-medium"
                            >
                                <span>Manage Projects</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📂</div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Projects Yet
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Projects will appear here once they're added to the database.
                        </p>
                        
                    </div>
                )}
            </div>
        </section>
    );
}
