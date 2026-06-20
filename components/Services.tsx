'use client';

import { SerializedService } from '@/types';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface ServiceDisplay {
    id: string;
    title: string;
    description: string;
    tools: string[];
    icon: React.ReactNode;
    accent: string;
}

// Default icons mapped by keyword
const SERVICE_ICONS: Record<string, React.ReactNode> = {
    web: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
    ),
    app: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
    ),
    design: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.764m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
    ),
    backend: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
    ),
    default: (
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
    ),
};

const ACCENTS = [
    'from-red-600 to-orange-500',
    'from-red-500 to-pink-600',
    'from-red-600 to-rose-500',
    'from-red-700 to-red-500',
    'from-red-500 to-amber-500',
];

function getIconForTitle(title: string): React.ReactNode {
    const lower = title.toLowerCase();
    if (lower.includes('web')) return SERVICE_ICONS.web;
    if (lower.includes('app') || lower.includes('mobile')) return SERVICE_ICONS.app;
    if (lower.includes('design') || lower.includes('ui') || lower.includes('ux')) return SERVICE_ICONS.design;
    if (lower.includes('backend') || lower.includes('api') || lower.includes('server') || lower.includes('cloud')) return SERVICE_ICONS.backend;
    return SERVICE_ICONS.default;
}

export default function Services({ id, services: rawServices = [] }: { id?: string; services: SerializedService[] }) {
    const header = useScrollReveal<HTMLDivElement>();
    const grid = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

    const services: ServiceDisplay[] = rawServices.map((s, i) => ({
        id: s.id || String(i),
        title: s.title,
        description: s.description,
        tools: s.tools,
        icon: getIconForTitle(s.title),
        accent: ACCENTS[i % ACCENTS.length],
    }));

    if (services.length === 0) return null;

    return (
        <section id={id} className="bg-black py-24 relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/[0.03] rounded-full blur-[150px] pointer-events-none"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div
                    ref={header.ref}
                    className={`mb-20 reveal-up ${header.isVisible ? 'revealed' : ''}`}
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div>
                            <p className="text-xs font-black text-red-500 uppercase tracking-[0.3em] mb-4">What I Do</p>
                            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase">
                                My <span className="text-red-600">Services</span>
                            </h2>
                        </div>
                        <p className="text-gray-500 font-medium max-w-sm text-sm leading-relaxed">
                            Turning ideas into polished digital products with a focus on performance, aesthetics, and user experience.
                        </p>
                    </div>
                    <div className="w-full h-px bg-zinc-800 mt-10"></div>
                </div>

                {/* Service Cards */}
                <div
                    ref={grid.ref}
                    className={`space-y-5 stagger-children ${grid.isVisible ? 'revealed' : ''}`}
                >
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="group relative"
                        >
                            {/* Card */}
                            <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10 p-8 md:p-10 bg-zinc-950/60 border border-zinc-800/60 rounded-3xl hover:border-zinc-700 transition-all duration-500 overflow-hidden">

                                {/* Background hover glow */}
                                <div className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-br ${service.accent} opacity-0 group-hover:opacity-[0.04] rounded-full blur-[80px] transition-opacity duration-700 -translate-y-1/2 translate-x-1/2`}></div>

                                {/* Number */}
                                <div className="shrink-0">
                                    <span className="text-6xl md:text-7xl font-black text-zinc-900 group-hover:text-red-600/20 transition-colors duration-500 select-none">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                {/* Icon + Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-3">
                                        {/* Icon badge */}
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.accent} p-[1px] shrink-0`}>
                                            <div className="w-full h-full bg-zinc-950 rounded-[11px] flex items-center justify-center text-red-500 group-hover:text-red-400 transition-colors">
                                                {service.icon}
                                            </div>
                                        </div>
                                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight group-hover:text-red-500 transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base mb-5 max-w-2xl">
                                        {service.description}
                                    </p>
                                    {/* Tools */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.tools.map((tool) => (
                                            <span
                                                key={tool}
                                                className="px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-gray-500 bg-zinc-900/80 border border-zinc-800 rounded-lg group-hover:text-gray-300 group-hover:border-zinc-700 transition-all duration-300"
                                            >
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>


                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
