export default function Experience({ id }: { id?: string }) {
    return (
        <section id={id} className="min-h-screen bg-black text-white py-20 border-t border-zinc-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                        Work <span className="text-red-600">Experience</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="space-y-8">
                    <div className="group bg-zinc-900/50 p-8 border border-zinc-800 hover:border-red-600 transition-all">
                        <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                            Full Stack Developer
                        </h4>
                        <p className="text-red-500 text-sm font-bold mb-2 uppercase tracking-widest">
                            COMPANY NAME • 2022 - PRESENT
                        </p>
                        <p className="text-gray-400 border-l-2 border-zinc-800 pl-4 group-hover:border-red-600 transition-all font-light leading-relaxed">
                            Building modern web applications using React, Next.js, and Firebase.
                            Collaborating with cross-functional teams to deliver high-quality products.
                        </p>
                    </div>

                    <div className="group bg-zinc-900/50 p-8 border border-zinc-800 hover:border-red-600 transition-all">
                        <h4 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                            Frontend Developer
                        </h4>
                        <p className="text-red-500 text-sm font-bold mb-2 uppercase tracking-widest">
                            PREVIOUS COMPANY • 2020 - 2022
                        </p>
                        <p className="text-gray-400 border-l-2 border-zinc-800 pl-4 group-hover:border-red-600 transition-all font-light leading-relaxed">
                            Developed responsive user interfaces and improved application performance.
                            Worked with design teams to implement pixel-perfect designs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
