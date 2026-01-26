import ProjectCard from '@/components/ProjectCard';
import { getProjects, Project } from '@/firebase/projects';

export default async function Projects() {
    let projects: Project[] = [];

    try {
        projects = await getProjects();
    } catch (error) {
        console.error('Error fetching projects:', error);
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        My Projects
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        A collection of my recent work and side projects
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-6"></div>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📂</div>
                        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                            No Projects Yet
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Projects will appear here once they're added to the database.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
