import Hero from '@/components/Hero';
import ProjectCard from '@/components/ProjectCard';
import { getProjects, Project } from '@/firebase/projects';
import Link from 'next/link';

export default async function Home() {
  // Fetch featured projects (limit to 3)
  let featuredProjects: Project[] = [];
  try {
    const allProjects = await getProjects();
    featuredProjects = allProjects.slice(0, 3);
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div>
      <Hero />

      {/* Featured Projects Section */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Check out some of my recent work
            </p>
          </div>

          {featuredProjects.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/projects"
                  className="inline-block px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-black transition-all duration-300"
                >
                  View All Projects
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No projects yet. Add some from the dashboard!
              </p>
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
