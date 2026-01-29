export default function About({ id }: { id?: string }) {
    return (
        <section id={id} className="min-h-screen bg-white dark:bg-black py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        About Me
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-yellow-500 to-black mx-auto"></div>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* Introduction */}
                    <article>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                            <span className="text-yellow-500">👋</span> Hello!
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            I'm a passionate Full Stack Developer with a love for creating beautiful,
                            functional web applications. With expertise in modern web technologies,
                            I specialize in building scalable solutions that solve real-world problems.
                        </p>
                    </article>

                    {/* Skills */}
                    <article>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="text-red-600">🚀</span> Skills & Technologies
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                'React & Next.js',
                                'TypeScript',
                                'Node.js',
                                'Firebase',
                                'Tailwind CSS',
                                'Git & GitHub',
                                'RESTful APIs',
                                'Database Design',
                                'Responsive Design',
                            ].map((skill) => (
                                <div
                                    key={skill}
                                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center font-medium text-gray-700 dark:text-gray-300 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors border border-transparent hover:border-yellow-500/30"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </article>

                    {/* Experience */}
                    <article>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="text-blue-500">💼</span> Experience
                        </h3>
                        <div className="space-y-6">
                            <div className="border-l-4 border-red-600 pl-6 hover:translate-x-2 transition-transform duration-300">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Full Stack Developer
                                </h4>
                                <p className="text-yellow-600 dark:text-yellow-500 mb-2 font-medium">
                                    Company Name • 2022 - Present
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Building modern web applications using React, Next.js, and Firebase.
                                    Collaborating with cross-functional teams to deliver high-quality products.
                                </p>
                            </div>

                            <div className="border-l-4 border-black dark:border-gray-700 pl-6 hover:translate-x-2 transition-transform duration-300">
                                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Frontend Developer
                                </h4>
                                <p className="text-yellow-600 dark:text-yellow-500 mb-2 font-medium">
                                    Previous Company • 2020 - 2022
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Developed responsive user interfaces and improved application performance.
                                    Worked with design teams to implement pixel-perfect designs.
                                </p>
                            </div>
                        </div>
                    </article>

                    {/* Education */}
                    <article>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="text-green-500">🎓</span> Education
                        </h3>
                        <div className="border-l-4 border-red-800 pl-6 hover:translate-x-2 transition-transform duration-300">
                            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Bachelor of Computer Science
                            </h4>
                            <p className="text-yellow-600 dark:text-yellow-500 mb-2 font-medium">
                                University Name • 2016 - 2020
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Focused on software engineering, algorithms, and web development.
                            </p>
                        </div>
                    </article>

                    {/* Interests */}
                    <article>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            <span className="text-purple-500">✨</span> Interests
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing
                            to open-source projects, reading tech blogs, or enjoying outdoor activities.
                            I'm always eager to learn and grow as a developer.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
