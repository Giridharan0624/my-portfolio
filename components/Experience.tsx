'use client';

import { useState, useEffect } from 'react';
import { getExperiences, Experience as ExperienceType } from '@/firebase/projects';

export default function Experience({ id }: { id?: string }) {
    const [experiences, setExperiences] = useState<ExperienceType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const data = await getExperiences();
                setExperiences(data);
            } catch (error) {
                console.error('Error fetching experiences:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchExperiences();
    }, []);

    if (loading) {
        return (
            <section id={id} className="py-20 bg-black">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <div className="animate-pulse text-red-600 font-bold uppercase tracking-widest">Loading Experience...</div>
                </div>
            </section>
        );
    }

    return (
        <section id={id} className="py-24 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-red-900/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-red-900/10 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-12xl md:text-[120px] font-black text-zinc-900/30 uppercase leading-none absolute left-0 right-0 -top-10 select-none pointer-events-none tracking-tighter">
                        EXPERIENCE
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight relative">
                        Work <span className="text-red-600">History</span>
                    </h3>
                    <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
                </div>

                <div className="relative">
                    {experiences.length > 0 ? (
                        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-0 md:left-1/2">
                            {experiences.map((exp, index) => (
                                <div key={exp.id} className={`mb-16 relative ${index % 2 === 0 ? 'md:mr-[50%] md:pr-12 text-right' : 'md:ml-[50%] md:pl-12 text-left'} group`}>
                                    {/* Timeline Dot */}
                                    <div className="absolute top-0 w-8 h-8 bg-black border-4 border-zinc-800 rounded-full -left-[17px] md:left-auto md:right-[-17px] group-hover:border-red-600 transition-all duration-300 z-20">
                                        <div className="w-2 h-2 bg-red-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"></div>
                                    </div>

                                    {/* Content Card */}
                                    <div className={`relative bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl hover:border-red-600/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${index % 2 === 0 ? 'md:group-hover:-translate-x-2' : 'md:group-hover:translate-x-2'}`}>
                                        <span className="text-red-600 font-black text-sm uppercase tracking-widest mb-2 block">{exp.period}</span>
                                        <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-1">{exp.role}</h4>
                                        <p className="text-xl font-bold text-gray-400 mb-4">{exp.company}</p>
                                        <p className="text-gray-500 font-medium leading-relaxed">{exp.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl max-w-2xl mx-auto">
                            <p className="text-zinc-600 font-bold uppercase tracking-widest">No work experience listed yet</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
