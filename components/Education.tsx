'use client';

import { useState, useEffect } from 'react';
import { getEducations, Education as EducationType } from '@/firebase/projects';

export default function Education({ id }: { id?: string }) {
    const [educations, setEducations] = useState<EducationType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducations = async () => {
            try {
                const data = await getEducations();
                setEducations(data);
            } catch (error) {
                console.error('Error fetching educations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEducations();
    }, []);

    if (loading) {
        return (
            <section id={id} className="py-20 bg-black">
                <div className="max-w-7xl auto px-4 text-center">
                    <div className="animate-pulse text-red-600 font-bold uppercase tracking-widest">Loading Education...</div>
                </div>
            </section>
        );
    }

    return (
        <section id={id} className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background Text */}
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none opacity-[0.02]">
                <h2 className="text-[300px] font-black uppercase tracking-tighter transform rotate-12">STUDY</h2>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-12xl md:text-[120px] font-black text-white/[0.03] uppercase leading-none absolute left-0 right-0 -top-10 select-none pointer-events-none tracking-tighter">
                        EDUCATION
                    </h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight relative">
                        Academic <span className="text-red-600">Background</span>
                    </h3>
                    <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {educations.length > 0 ? (
                        educations.map((edu) => (
                            <div key={edu.id} className="group relative bg-black/50 border border-zinc-900 p-10 rounded-[40px] hover:border-red-600 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden">
                                {/* Decor element */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-red-600/10 transition-all"></div>

                                <div className="flex flex-col h-full relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-2xl shadow-[0_10px_20px_rgba(220,38,38,0.2)]">
                                            🎓
                                        </div>
                                        <span className="px-4 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-black text-red-500 uppercase tracking-widest">
                                            {edu.period}
                                        </span>
                                    </div>

                                    <h4 className="text-2xl font-black text-white uppercase tracking-tight mb-2 group-hover:text-red-500 transition-colors">
                                        {edu.degree}
                                    </h4>
                                    <p className="text-lg font-bold text-gray-400 mb-6">{edu.school}</p>

                                    <p className="text-gray-500 font-medium leading-relaxed mt-auto">
                                        {edu.description}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                            <p className="text-zinc-600 font-bold uppercase tracking-widest">No educational background listed yet</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
