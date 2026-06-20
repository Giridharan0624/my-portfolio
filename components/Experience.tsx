'use client';

import { SerializedExperience } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function Experience({ id, experiences = [] }: { id?: string; experiences: SerializedExperience[] }) {
    const header = useScrollReveal<HTMLDivElement>();
    const timeline = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

    // Sort: newest first (top), oldest last (bottom)
    const sorted = [...experiences].sort((a, b) => b.createdAt - a.createdAt);

    return (
        <section id={id} className="py-24 bg-black relative overflow-hidden">
            {/* Background Text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02]">
                <h2 className="text-[300px] font-black uppercase tracking-tighter transform -rotate-12">WORK</h2>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div
                    ref={header.ref}
                    className={`text-center mb-20 reveal-up ${header.isVisible ? 'revealed' : ''}`}
                >
                    <h2 className="text-12xl md:text-[120px] font-black text-white/[0.03] uppercase leading-none absolute left-0 right-0 -top-10 select-none pointer-events-none tracking-tighter">
                        EXPERIENCE
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight relative">
                        Work <span className="text-red-600">Experience</span>
                    </h3>
                    <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
                </div>

                {sorted.length > 0 ? (
                    <div
                        ref={timeline.ref}
                        className={`relative reveal-left ${timeline.isVisible ? 'revealed' : ''}`}
                    >
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-zinc-800"></div>

                        {/* "NOW" marker at top */}
                        <div className="relative flex items-center mb-12 pl-16 md:pl-20">
                            <div className="absolute left-[18px] md:left-[26px] w-4 h-4 bg-red-600 rounded-full shadow-[0_0_15px_rgba(255,0,0,0.5)] z-10"></div>
                            <span className="text-xs font-black text-red-500 uppercase tracking-[0.3em] bg-red-600/10 border border-red-600/20 px-4 py-1.5 rounded-full">Present</span>
                        </div>

                        {/* Experience Cards */}
                        {sorted.map((exp, index) => (
                            <div key={exp.id} className="relative mb-12 last:mb-0 group">
                                {/* Timeline Dot */}
                                <div className="absolute left-[14px] md:left-[22px] top-10 z-10">
                                    <div className="w-6 h-6 bg-black border-[3px] border-zinc-700 rounded-full group-hover:border-red-600 transition-all duration-300 flex items-center justify-center">
                                        <div className="w-2 h-2 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="ml-16 md:ml-20 bg-zinc-900/50 border border-zinc-800 p-8 rounded-3xl hover:border-red-600/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] group-hover:translate-x-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                                        <span className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-black text-red-500 uppercase tracking-widest w-fit">
                                            {exp.period}
                                        </span>
                                        <div className="w-8 h-8 bg-red-600/10 rounded-xl flex items-center justify-center text-lg">
                                            💼
                                        </div>
                                    </div>

                                    <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1 group-hover:text-red-500 transition-colors">
                                        {exp.role}
                                    </h4>
                                    <p className="text-lg font-bold text-gray-400 mb-4">{exp.company}</p>
                                    <p className="text-gray-500 font-medium leading-relaxed">{exp.description}</p>
                                </div>
                            </div>
                        ))}

                        {/* "START" marker at bottom */}
                        <div className="relative flex items-center mt-12 pl-16 md:pl-20">
                            <div className="absolute left-[18px] md:left-[26px] w-4 h-4 bg-zinc-700 rounded-full z-10"></div>
                            <span className="text-xs font-black text-zinc-600 uppercase tracking-[0.3em]">Career Start</span>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                        <p className="text-zinc-600 font-bold uppercase tracking-widest">No work experience listed yet</p>
                    </div>
                )}
            </div>
        </section>
    );
}
