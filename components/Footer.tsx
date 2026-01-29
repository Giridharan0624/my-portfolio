import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const navLinks = [
        { label: 'HOME', href: '/#' },
        { label: 'ABOUT', href: '/#about' },
        { label: 'SKILLS', href: '/#skills' },
        { label: 'EXPERIENCE', href: '/#experience' },
        { label: 'EDUCATION', href: '/#education' },
        { label: 'PROJECTS', href: '/#projects' },
        { label: 'CONTACT', href: '/#contact' },
    ];

    return (
        <footer className="bg-black py-10 border-t border-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Rights */}
                    <div className="text-gray-400 text-sm font-medium tracking-wide">
                        &copy; {currentYear} <span className="text-white">GIRIDHARAN S</span>. ALL RIGHTS RESERVED.
                    </div>

                    {/* Quick Links */}
                    <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-gray-400 hover:text-red-600 text-xs font-bold tracking-widest transition-colors uppercase"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </footer>
    );
}
