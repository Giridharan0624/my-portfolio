import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';

export const dynamic = 'force-dynamic';

import {
  getProjects,
  getSkills,
  getExperiences,
  getEducations,
  getServices,
} from '@/firebase/projects';
import {
  SerializedProject,
  SerializedSkill,
  SerializedExperience,
  SerializedEducation,
  SerializedService,
} from '@/types';

export default async function Home() {
  // Parallel server-side fetch of all Firestore collections
  const [rawProjects, rawSkills, rawExperiences, rawEducations, rawServices] =
    await Promise.allSettled([
      getProjects(),
      getSkills(),
      getExperiences(),
      getEducations(),
      getServices(),
    ]);

  // Helper to serialize Firestore Timestamps to plain ms numbers
  const toMs = (ts: { toMillis?: () => number } | null | undefined): number =>
    ts?.toMillis?.() ?? Date.now();

  const allProjects: SerializedProject[] =
    rawProjects.status === 'fulfilled'
      ? rawProjects.value.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: toMs(createdAt),
        }))
      : [];

  const allSkills: SerializedSkill[] =
    rawSkills.status === 'fulfilled'
      ? rawSkills.value.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: toMs(createdAt),
        }))
      : [];

  const allExperiences: SerializedExperience[] =
    rawExperiences.status === 'fulfilled'
      ? rawExperiences.value.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: toMs(createdAt),
        }))
      : [];

  const allEducations: SerializedEducation[] =
    rawEducations.status === 'fulfilled'
      ? rawEducations.value.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: toMs(createdAt),
        }))
      : [];

  const allServices: SerializedService[] =
    rawServices.status === 'fulfilled'
      ? rawServices.value.map(({ createdAt, ...rest }) => ({
          ...rest,
          createdAt: toMs(createdAt),
        }))
      : [];

  return (
    <div className="flex flex-col">
      <Hero />
      <About id="about" />
      <Services id="services" services={allServices} />
      <Projects id="projects" projects={allProjects} />
      <Skills id="skills" skills={allSkills} />
      <Experience id="experience" experiences={allExperiences} />
      <Education id="education" educations={allEducations} />
      <Contact id="contact" />
    </div>
  );
}
