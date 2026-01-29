'use client';

export default function About({ id }: { id?: string }) {
    return (
        <section id={id} className="min-h-screen bg-black text-white py-20 border-t border-zinc-900 flex items-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                        About <span className="text-red-600">Me</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                {/* Content */}
                <article className="bg-zinc-900/50 p-10 border-l-4 border-red-600 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-red-600/10 transition-colors"></div>
                    <p className="text-xl text-gray-300 leading-relaxed font-light relative z-10">
                        I’m an aspiring <span className="text-white font-medium border-b-2 border-red-600">software developer</span> who builds mobile, desktop, and web applications with a strong focus on creating practical, user-friendly solutions. I enjoy working across the full development lifecycle—from planning and design to coding, testing, and deployment—using both manual development techniques and AI-integrated workflows to improve efficiency and innovation. Driven by curiosity and continuous learning, I’m always exploring new technologies and best practices to craft reliable, scalable, and impactful software.
                    </p>
                </article>
            </div>
        </section>
    );
}
