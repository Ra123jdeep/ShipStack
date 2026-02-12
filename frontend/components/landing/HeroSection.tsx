"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Command, Sparkles, ArrowRight, LayoutGrid } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
    const router = useRouter()
    const [isFocused, setIsFocused] = useState(false)

    return (
        <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 pt-20 pb-0 overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">

                {/* Pill Label */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-400 mb-4"
                >
                    <Sparkles className="w-3 h-3" />
                    <span>v2.0 Now Available</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-2xl"
                >
                    Build Your Next <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 animate-shimmer">
                        Unicorn.
                    </span>
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    The AI-powered operating system for modern developers. <br className="hidden md:block" />
                    Stack, ship, and scale with confidence.
                </motion.p>

                {/* Command Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="w-full max-w-xl mx-auto mt-10"
                >
                    <div className={`relative group cursor-text transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex items-center gap-4 bg-[#0B0F17]/90 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-5 shadow-2xl hover:border-white/20 transition-all focus-within:border-blue-500/50 focus-within:ring-1 focus-within:ring-blue-500/20">
                            <Command className="w-6 h-6 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Ask ShipStack to build something..."
                                className="w-full bg-transparent border-none p-0 text-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-0 font-light"
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const target = e.target as HTMLInputElement;
                                        if (target.value.trim()) {
                                            router.push(`/stack-generator?query=${encodeURIComponent(target.value)}`);
                                        }
                                    }
                                }}
                            />
                            <div className="flex gap-2">
                                <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-white/10 bg-white/5 px-2 font-mono text-[10px] font-medium text-gray-400">
                                    <span className="text-xs">⌘</span>K
                                </kbd>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-6 text-sm text-gray-500">
                        <span>Try:</span>
                        <Link href="/stack-generator?query=SaaS%20Marketplace" className="hover:text-blue-400 transition-colors">"SaaS Marketplace"</Link>
                        <Link href="/stack-generator?query=AI%20Chatbot" className="hover:text-blue-400 transition-colors">"AI Chatbot"</Link>
                        <Link href="/stack-generator?query=E-commerce" className="hover:text-blue-400 transition-colors">"E-commerce"</Link>
                    </div>
                </motion.div>

            </div >
        </section >
    )
}
