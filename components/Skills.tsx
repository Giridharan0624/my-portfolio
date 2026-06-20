'use client';

import { useState } from 'react';
import { SerializedSkill } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Aliases map common skill names to their Devicon directory names.
 * Any skill NOT in this list will be auto-resolved by lowercasing
 * and stripping spaces/dots (e.g. "Vue.js" → "vuejs").
 */
const DEVICON_ALIASES: Record<string, string> = {
    'c++': 'cplusplus',
    'c#': 'csharp',
    'html': 'html5',
    'css': 'css3',
    'next js': 'nextjs',
    'next.js': 'nextjs',
    'react.js': 'react',
    'node.js': 'nodejs',
    'express.js': 'express',
    'vue.js': 'vuejs',
    'tailwind css': 'tailwindcss',
    'tailwind': 'tailwindcss',
    'git & github': 'github',
    'aws': 'amazonwebservices',
    'sass/scss': 'sass',
};

/** Variants to try in order for each icon */
const VARIANTS = ['original', 'plain', 'original-wordmark'];

/**
 * Dynamically resolve a Devicon CDN URL from any skill name.
 * 1. Check aliases map
 * 2. Otherwise normalize: lowercase, strip dots/spaces
 * 3. Try multiple icon variants
 */
function getDeviconSlug(name: string): string {
    const lower = name.toLowerCase().trim();
    if (DEVICON_ALIASES[lower]) return DEVICON_ALIASES[lower];
    // Normalize: "React.js" → "reactjs", "Tailwind CSS" → "tailwindcss"
    return lower.replace(/[.\s]+/g, '');
}

function getLogoUrl(name: string, variant: string = 'original'): string {
    const slug = getDeviconSlug(name);
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${slug}/${slug}-${variant}.svg`;
}

/** Component for a single skill logo with automatic fallback */
function SkillLogo({ name }: { name: string }) {
    const [variantIndex, setVariantIndex] = useState(0);
    const [failed, setFailed] = useState(false);

    const currentUrl = getLogoUrl(name, VARIANTS[variantIndex]);

    const handleError = () => {
        if (variantIndex < VARIANTS.length - 1) {
            // Try the next variant
            setVariantIndex(prev => prev + 1);
        } else {
            // All variants failed, show fallback
            setFailed(true);
        }
    };

    if (failed) {
        // Fallback: first letter of the skill name
        return (
            <div className="w-10 h-10 rounded-lg bg-red-600/20 border border-red-600/30 flex items-center justify-center text-red-500 font-black text-lg uppercase">
                {name.charAt(0)}
            </div>
        );
    }

    return (
        <img
            src={currentUrl}
            alt={name}
            className="w-10 h-10 group-hover:scale-110 transition-transform duration-300 object-contain"
            loading="lazy"
            onError={handleError}
        />
    );
}

export default function Skills({ id, skills }: { id?: string; skills: SerializedSkill[] }) {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const header = useScrollReveal<HTMLDivElement>();
    const grid = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

    return (
        <section id={id} className="bg-black text-white py-24 relative overflow-hidden">
            {/* Subtle background grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                }}
            ></div>

            {/* Floating glow orbs */}
            <div className="absolute top-1/3 -right-32 w-64 h-64 bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-red-600/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div
                    ref={header.ref}
                    className={`text-center mb-20 reveal-up ${header.isVisible ? 'revealed' : ''}`}
                >
                    <p className="text-xs font-black text-red-500 uppercase tracking-[0.3em] mb-4">What I Work With</p>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
                        Tech <span className="text-red-600">Stack</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-red-600 mx-auto mt-6"></div>
                </div>

                {/* Skills Grid */}
                <div
                    ref={grid.ref}
                    className={`stagger-children ${grid.isVisible ? 'revealed' : ''}`}
                >
                    {skills.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {skills.map((skill, index) => (
                                <div
                                    key={skill.id}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredSkill(skill.id || null)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                    style={{ animationDelay: `${index * 0.05}s` }}
                                >
                                    {/* Glow effect on hover */}
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-red-900 rounded-2xl blur opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>

                                    {/* Card */}
                                    <div className={`relative flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-500 cursor-default
                                        ${hoveredSkill === (skill.id || null)
                                            ? 'bg-zinc-900 border-red-600/60 scale-[1.02] -translate-y-1'
                                            : 'bg-zinc-950/80 border-zinc-800/60 hover:border-zinc-700'
                                        }`}
                                    >
                                        {/* Auto-resolved logo */}
                                        <SkillLogo name={skill.name} />

                                        {/* Name */}
                                        <span className="text-sm font-bold text-gray-300 group-hover:text-white uppercase tracking-wider text-center transition-colors duration-300">
                                            {skill.name}
                                        </span>

                                        {/* Bottom accent line */}
                                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-red-600 group-hover:w-3/4 transition-all duration-500 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-3xl">
                            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Skills loading...</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
