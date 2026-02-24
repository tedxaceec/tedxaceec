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
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                <div className="flex items-center justify-between h-14 bg-white/5 border border-white/10 rounded-full px-6 backdrop-blur-md shadow-lg">
                    <div className="shrink-0">
                        <Link href="/" className="text-white font-black text-xl tracking-[0.2em] uppercase">
                            TEDx
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex items-center space-x-2">
                            <Link
                                href="/"
                                className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                            >
                                Home
                            </Link>
                            <Link
                                href="#about"
                                className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                            >
                                About
                            </Link>
                            <Link
                                href="#speakers"
                                className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                            >
                                Speakers
                            </Link>
                            <Link
                                href="#contact"
                                className="text-white/70 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
