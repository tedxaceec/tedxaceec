import React from 'react'

const navbar = () => {
    return (
        <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 max-w-screen-xl items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <a href="#" className="flex items-center gap-2">
                        <span className="text-xl font-bold">TEDxACEEC</span>
                    </a>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
                        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
                        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Services</a>
                        <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button className="hidden md:inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                        Get Started
                    </button>
                    <button className="md:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default navbar