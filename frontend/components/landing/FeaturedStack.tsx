"use client"

import { motion } from "framer-motion"
import { Layers, ArrowRight, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function FeaturedStack() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">

            <div className="container max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
                >
                    {/* Text Content */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-sm font-semibold text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-blue-400"></span>
                                Featured Stack
                            </h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                The Modern <br />
                                <span className="text-white">Scalability Standard.</span>
                            </h2>
                            <p className="text-gray-400 mt-6 text-lg leading-relaxed">
                                Designed for high-performance applications that need to scale from zero to millions. Pre-configured for Vercel deployment.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {["Next.js App Router for Performance", "FastAPI for Type-Safe Backend", "Supabase for Real-time Data"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>

                        <Link href="/stack-generator?query=Next.js+FastAPI+Supabase">
                            <Button variant="outline" className="border-white/10 hover:bg-white/5 text-white h-12 px-6 rounded-full group">
                                View Full Specs <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Visual Card */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50" />
                        <div className="relative glass-panel p-8 md:p-12 rounded-3xl border border-white/10 overflow-hidden transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
                            <div className="absolute top-0 right-0 p-6">
                                <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 backdrop-blur-md">
                                    99.9% Uptime
                                </Badge>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {["Next.js", "FastAPI", "PostgreSQL", "Vercel"].map((tech) => (
                                    <div key={tech} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center gap-3 hover:bg-white/10 transition-colors">
                                        <Layers className="w-8 h-8 text-white/80" />
                                        <span className="text-sm font-medium text-gray-300">{tech}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
