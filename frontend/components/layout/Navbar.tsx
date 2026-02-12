"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Rocket, Search } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

export function Navbar() {
    const pathname = usePathname()
    const { user, logout } = useAuth()

    const navItems = [
        { name: "Explore Tools", href: "/tools/all" },
        { name: "Stack Generator", href: "/stack-generator" },
        { name: "Builders", href: "/builders" },
        { name: "Insights", href: "/insights" },
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-md supports-[backdrop-filter]:bg-black/10">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <div className="bg-primary/10 p-1.5 rounded-lg">
                            <Rocket className="h-5 w-5 text-primary" />
                        </div>
                        <span>ShipStack</span>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary relative",
                                pathname === item.href ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.name}
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="navbar-indicator"
                                    className="absolute -bottom-[21px] left-0 right-0 h-[3px] bg-primary rounded-t-full"
                                />
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Search className="h-5 w-5" />
                    </Button>
                    <div className="hidden md:flex relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search tools..."
                            className="h-9 w-64 rounded-full border border-input bg-muted/50 px-9 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    const target = e.target as HTMLInputElement;
                                    const value = target.value.trim();
                                    if (value) {
                                        window.location.href = `/tools/all?search=${encodeURIComponent(value)}`;
                                    }
                                }
                            }}
                        />
                    </div>

                    {user ? (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-white hidden md:block">
                                {user.full_name?.split(' ')[0] || 'Builder'}
                            </span>
                            <Button variant="ghost" size="sm" onClick={logout} className="text-gray-400 hover:text-white">
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <Link href="/auth/login">
                            <Button variant="default" size="sm" className="hidden md:flex">
                                Sign In
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
