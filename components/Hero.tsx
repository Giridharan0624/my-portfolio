import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                            <div className="absolute inset-0 bg-red-600 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
                            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-red-600 shadow-[0_0_50px_rgba(255,0,0,0.3)]">
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
                            <span className="text-red-500 font-bold text-xl tracking-wider">
                                👋 HELLO, I'M
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-white">
                            GIRIDHARAN <span className="text-red-600">S</span>
                        </h1>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-8">
                            FULL STACK <span className="text-red-500">DEVELOPER</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
                            I build exceptional digital experiences that combine
                            <span className="text-white font-semibold"> bold design</span> with
                            <span className="text-white font-semibold"> powerful functionality</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center">
                            <Link
                                href="/#projects"
                                className="px-8 py-4 bg-red-600 text-white font-bold rounded-none hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] uppercase tracking-widest"
                            >
                                View Work
                            </Link>
                            <Link
                                href="/#contact"
                                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-none hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest"
                            >
                                Contact Me
                            </Link>
                        </div>

                        {/* Skills/Tech Stack */}
                        <div className="mt-20">
                            <p className="text-red-500 text-sm font-bold uppercase tracking-widest mb-6">
                                Tech Stack
                            </p>
                            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                                {['React', 'Next.js', 'TypeScript', 'Firebase', 'Tailwind', 'Node.js'].map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-4 py-2 bg-zinc-900 text-gray-300 border border-zinc-800 hover:border-red-600 hover:text-white transition-colors uppercase text-sm font-bold tracking-wider"
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
