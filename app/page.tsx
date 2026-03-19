import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import { getProjects } from '@/firebase/projects';

export default async function Home() {
  // Fetch all projects for the Projects section
  let allProjects: Array<{
    id?: string;
    title: string;
    description: string;
    image: string;
    github: string;
    demo: string;
    tech: string[];
    createdAt: number;
  }> = [];

  try {
    const rawProjects = await getProjects();
    // Serialize Firestore Timestamps to plain numbers for client components
    allProjects = rawProjects.map(({ createdAt, ...rest }) => ({
      ...rest,
      createdAt: createdAt?.toMillis?.() ?? Date.now(),
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  return (
    <div className="flex flex-col">
      <Hero />
      <About id="about" />
      <Services id="services" />
      <Projects id="projects" projects={allProjects} />
      <Skills id="skills" />
      <Experience id="experience" />
      <Education id="education" />
      <Contact id="contact" />
    </div>
  );
}

