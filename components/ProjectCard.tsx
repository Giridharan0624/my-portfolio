import Image from 'next/image';
import { SerializedProject } from '@/components/Projects';

interface ProjectCardProps {
    project: SerializedProject;
    onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    return (
        <div
            className="group bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all duration-300 hover:-translate-y-2 rounded-3xl overflow-hidden cursor-pointer"
            onClick={onClick}
        >
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
                {/* View Details Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="px-5 py-2.5 bg-red-600 text-white font-black uppercase text-xs tracking-widest rounded-xl shadow-[0_8px_25px_rgba(220,38,38,0.4)] scale-90 group-hover:scale-100 transition-transform duration-300">
                        View Details
                    </span>
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
