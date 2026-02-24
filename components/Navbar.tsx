import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 w-full z-100 bg-black/5 backdrop-blur-3xl bg-linear-to-b from-black/60 to-transparent"
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
            }}
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex items-center justify-between h-14 bg-white/5 border border-white/10 rounded-full px-6 backdrop-blur-md shadow-lg">
                    <div className="shrink-0">
                        <Link
                            href="/"
                            className="text-white font-black text-xl tracking-[0.2em] uppercase"
                            aria-label="TEDxACEEC — Go to homepage"
                        >
                            TEDx
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex items-center space-x-2 list-none m-0 p-0" role="list">
                            <li>
                                <Link
                                    href="/"
                                    className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#about"
                                    className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#speakers"
                                    className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                                >
                                    Speakers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#contact"
                                    className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
