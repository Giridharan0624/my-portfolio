import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'GitHub', href: 'https://github.com', icon: '🔗' },
        { name: 'LinkedIn', href: 'https://linkedin.com', icon: '💼' },
        { name: 'Twitter', href: 'https://twitter.com', icon: '🐦' },
    ];

    return (
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent mb-4">
                            Portfolio
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Building amazing web experiences with modern technologies.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                                    Projects
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
                        <div className="flex space-x-4">
                            {socialLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-2xl hover:scale-110 transition-transform"
                                    aria-label={link.name}
                                >
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400">
                    <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
