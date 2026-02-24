import Link from "next/link";
import React from "react";

export default function Navbar() {
    return (
        <nav
            className="fixed top-0 left-0 right-0 w-full z-100 bg-black/5 backdrop-blur-3xl bg-linear-to-b from-black/40 to-transparent"
            style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="shrink-0">
                        <Link href="/" className="text-white font-bold text-xl tracking-widest uppercase">
                            TEDx
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link
                                href="/"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="#about"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                About
                            </Link>
                            <Link
                                href="#speakers"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Speakers
                            </Link>
                            <Link
                                href="#contact"
                                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
