import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-black dark:from-gray-900 dark:via-black dark:to-red-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-black rounded-full blur-2xl opacity-30"></div>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-red-600 shadow-2xl">
                                <Image
                                    src="/profile.jpg"
                                    alt="GIRIDHARAN S"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                        {/* Greeting */}
                        <div className="mb-4">
                            <span className="text-red-600 dark:text-red-400 font-semibold text-lg animate-pulse">
                                👋 Hello, I'm
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-red-600 via-black to-red-800 bg-clip-text text-transparent">
                                GIRIDHARAN S
                            </span>
                        </h1>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-8">
                            Full Stack Developer & Designer
                        </h2>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12">
                            I build exceptional digital experiences that combine beautiful design with powerful functionality.
                            Passionate about creating solutions that make a difference.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                            <Link
                                href="/projects"
                                className="px-8 py-4 bg-gradient-to-r from-red-600 to-black text-white font-semibold rounded-full hover:shadow-lg hover:shadow-red-600/50 hover:scale-105 transition-all duration-300"
                            >
                                View My Work
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-4 border-2 border-red-600 text-red-600 dark:text-red-400 dark:border-red-400 font-semibold rounded-full hover:bg-red-600 hover:text-white dark:hover:bg-red-400 dark:hover:text-black transition-all duration-300"
                            >
                                Get In Touch
                            </Link>
                        </div>

                        {/* Skills/Tech Stack */}
                        <div className="mt-16">
                            <p className="text-gray-500 dark:text-gray-500 text-sm uppercase tracking-wider mb-6">
                                Technologies I Work With
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                                {['React', 'Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Node.js'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 shadow-md hover:shadow-lg hover:shadow-red-600/30 transition-shadow border border-red-600/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
