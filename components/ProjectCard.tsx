import Image from 'next/image';
import { Project } from '@/firebase/projects';

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="group bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all duration-300 hover:-translate-y-2">
            {/* Project Image */}
            <div className="relative h-48 w-full overflow-hidden bg-black">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 group-hover:opacity-80 transition-all duration-500"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-zinc-700 bg-zinc-950">
                        <span className="text-4xl">🚀</span>
                    </div>
                )}
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-red-900/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-black text-white font-bold uppercase text-xs tracking-wider border border-white hover:bg-white hover:text-black transition-colors">
                                Code
                            </a>
                        )}
                        {project.demo && (
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-white text-black font-bold uppercase text-xs tracking-wider border border-white hover:bg-transparent hover:text-white transition-colors">
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Project Info */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors uppercase">
                    {project.title}
                </h3>
                <p className="text-gray-400 mb-6 line-clamp-2 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, index) => (
                        <span
                            key={index}
                            className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-300 bg-zinc-950 border border-zinc-800"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
