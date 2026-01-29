'use client';

import { useState, useEffect } from 'react';
import { getSkills, Skill } from '@/firebase/projects';

export default function About({ id }: { id?: string }) {
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
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                        About <span className="text-red-600">Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                {/* Content */}
                <div className="space-y-16">
                    {/* Introduction */}
                    <article className="bg-zinc-900/50 p-8 border-l-4 border-red-600">
                        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <span className="text-red-500">01.</span> INTRODUCTION
                        </h3>
                        <p className="text-lg text-gray-300 leading-relaxed font-light">
                            I’m an aspiring <span className="text-white font-medium">software developer</span> who builds mobile, desktop, and web applications with a strong focus on creating practical, user-friendly solutions. I enjoy working across the full development lifecycle—from planning and design to coding, testing, and deployment—using both manual development techniques and AI-integrated workflows to improve efficiency and innovation. Driven by curiosity and continuous learning, I’m always exploring new technologies and best practices to craft reliable, scalable, and impactful software.
                        </p>
                    </article>

                    {/* Skills */}
                    <article>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="text-red-500">02.</span> SKILLS & TECH
                        </h3>
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
                    </article>

                    {/* Experience */}
                    <article>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="text-red-500">03.</span> EXPERIENCE
                        </h3>
                        <div className="space-y-8">
                            <div className="group">
                                <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                                    Full Stack Developer
                                </h4>
                                <p className="text-red-500 text-sm font-bold mb-2">
                                    COMPANY NAME • 2022 - PRESENT
                                </p>
                                <p className="text-gray-400 border-l-2 border-zinc-800 pl-4 group-hover:border-red-600 transition-colors">
                                    Building modern web applications using React, Next.js, and Firebase.
                                    Collaborating with cross-functional teams to deliver high-quality products.
                                </p>
                            </div>

                            <div className="group">
                                <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                                    Frontend Developer
                                </h4>
                                <p className="text-red-500 text-sm font-bold mb-2">
                                    PREVIOUS COMPANY • 2020 - 2022
                                </p>
                                <p className="text-gray-400 border-l-2 border-zinc-800 pl-4 group-hover:border-red-600 transition-colors">
                                    Developed responsive user interfaces and improved application performance.
                                    Worked with design teams to implement pixel-perfect designs.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Education */}
                    <article>
                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <span className="text-red-500">04.</span> EDUCATION
                        </h3>
                        <div className="bg-zinc-900 border border-zinc-800 p-6 hover:border-red-600 transition-colors">
                            <h4 className="text-xl font-bold text-white">
                                Bachelor of Computer Science
                            </h4>
                            <p className="text-red-500 text-sm font-bold mb-2">
                                UNIVERSITY NAME • 2016 - 2020
                            </p>
                            <p className="text-gray-400">
                                Focused on software engineering, algorithms, and web development.
                            </p>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    );
}
