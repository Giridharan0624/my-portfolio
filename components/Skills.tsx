'use client';

import { useState, useEffect } from 'react';
import { getSkills, Skill } from '@/firebase/projects';

export default function Skills({ id }: { id?: string }) {
    const [skills, setSkills] = useState<Skill[]>([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const fetchedSkills = await getSkills();
                setSkills(fetchedSkills);
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id={id} className="min-h-screen bg-black text-white py-20 border-t border-zinc-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                        Technical <span className="text-red-600">Skills</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {skills.length > 0 ? (
                        skills.map((skill) => (
                            <div
                                key={skill.id}
                                className="p-4 bg-zinc-900 text-center font-medium text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-300 cursor-default border border-zinc-800 uppercase tracking-tighter text-sm"
                            >
                                {skill.name}
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-10 text-center border border-dashed border-zinc-800 rounded-xl">
                            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Skills will be appearing soon</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
