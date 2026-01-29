import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
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
      <Skills id="skills" />
      <Experience id="experience" />
      <Education id="education" />
      <Projects id="projects" projects={allProjects} />
      <Contact id="contact" />
    </div>
  );
}
