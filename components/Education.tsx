export default function Education({ id }: { id?: string }) {
    return (
        <section id={id} className="min-h-screen bg-black text-white py-20 border-t border-zinc-900">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight uppercase">
                        My <span className="text-red-600">Education</span>
                    </h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 p-10 hover:border-red-600 transition-all border-l-4 border-l-red-600">
                    <h4 className="text-2xl font-bold text-white mb-2 uppercase tracking-wide">
                        Bachelor of Computer Science
                    </h4>
                    <p className="text-red-500 text-sm font-black mb-6 tracking-widest uppercase">
                        UNIVERSITY NAME • 2016 - 2020
                    </p>
                    <p className="text-gray-400 text-lg font-light leading-relaxed">
                        Focused on software engineering, algorithms, and web development. I gained a strong foundation in computer science principles and developed a passion for building complex, scalable systems through various academic and personal projects.
                    </p>
                </div>
            </div>
        </section>
    );
}
