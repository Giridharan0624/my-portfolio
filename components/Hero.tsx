import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-black to-black"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 hero-animate">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Profile Image */}
                    <div className="flex-shrink-0 hero-image">
                        <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                            <div className="absolute inset-0 bg-red-600 rounded-full blur-[100px] opacity-20 float-glow"></div>
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
                        <div className="mb-4 hero-greeting">
                            <span className="text-red-500 font-bold text-xl tracking-wider">
                                👋 HELLO, I&apos;M
                            </span>
                        </div>

                        {/* Name */}
                        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tighter text-white hero-name">
                            GIRIDHARAN <span className="text-red-600">S</span>
                        </h1>

                        {/* Title */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-400 mb-8 hero-title">
                            Software <span className="text-red-500">Developer</span> & UI/UX <span className="text-red-500">Designer</span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed hero-desc">
                            I build exceptional digital experiences that combine
                            <span className="text-white font-semibold"> bold design</span> with
                            <span className="text-white font-semibold"> powerful functionality</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center hero-buttons">
                            <Link
                                href="/#projects"
                                className="px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-[0_0_20px_rgba(255,0,0,0.4)] hover:shadow-[0_0_30px_rgba(255,0,0,0.6)] uppercase tracking-widest hover:scale-105"
                            >
                                View Work
                            </Link>
                            <Link
                                href="/#contact"
                                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest hover:scale-105"
                            >
                                Contact Me
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
