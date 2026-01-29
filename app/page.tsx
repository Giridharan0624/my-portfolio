import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { getProjects, Project } from '@/firebase/projects';

export default async function Home() {
  // Fetch all projects for the Projects section
  let allProjects: Project[] = [];
  try {
    allProjects = await getProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <About id="about" />
      <Projects id="projects" projects={allProjects} />
      <Contact id="contact" />
    </div>
  );
}
