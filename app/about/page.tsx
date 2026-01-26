export default function About() {
    return (
        <div className="min-h-screen bg-white dark:bg-black py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        About Me
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto"></div>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* Introduction */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            👋 Hello!
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            I'm a passionate Full Stack Developer with a love for creating beautiful,
                            functional web applications. With expertise in modern web technologies,
                            I specialize in building scalable solutions that solve real-world problems.
                        </p>
                    </section>

                    {/* Skills */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            🚀 Skills & Technologies
                        </h2>
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
                                    className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border border-red-600/20"
                                >
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            💼 Experience
                        </h2>
                        <div className="space-y-6">
                            <div className="border-l-4 border-red-600 pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Full Stack Developer
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    Company Name • 2022 - Present
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Building modern web applications using React, Next.js, and Firebase.
                                    Collaborating with cross-functional teams to deliver high-quality products.
                                </p>
                            </div>

                            <div className="border-l-4 border-black pl-6">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Frontend Developer
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">
                                    Previous Company • 2020 - 2022
                                </p>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Developed responsive user interfaces and improved application performance.
                                    Worked with design teams to implement pixel-perfect designs.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            🎓 Education
                        </h2>
                        <div className="border-l-4 border-red-800 pl-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Bachelor of Computer Science
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-2">
                                University Name • 2016 - 2020
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                                Focused on software engineering, algorithms, and web development.
                            </p>
                        </div>
                    </section>

                    {/* Interests */}
                    <section>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                            ✨ Interests
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing
                            to open-source projects, reading tech blogs, or enjoying outdoor activities.
                            I'm always eager to learn and grow as a developer.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
