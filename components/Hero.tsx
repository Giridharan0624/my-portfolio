import Link from 'next/link';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-purple-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Greeting */}
                    <div className="inline-block mb-4">
                        <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg animate-pulse">
                            👋 Hello, I'm
                        </span>
                    </div>

                    {/* Name */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            GIRIDHARAN S
                        </span>
                    </h1>

                    {/* Title */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
                        Full Stack Developer & Designer
                    </h2>

                    {/* Description */}
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12">
                        I build exceptional digital experiences that combine beautiful design with powerful functionality.
                        Passionate about creating solutions that make a difference.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/projects"
                            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            View My Work
                        </Link>
                        <Link
                            href="/contact"
                            className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 font-semibold rounded-full hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-black transition-all duration-300"
                        >
                            Get In Touch
                        </Link>
                    </div>

                    {/* Skills/Tech Stack */}
                    <div className="mt-16">
                        <p className="text-gray-500 dark:text-gray-500 text-sm uppercase tracking-wider mb-6">
                            Technologies I Work With
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {['React', 'Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Node.js'].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg transition-shadow"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
