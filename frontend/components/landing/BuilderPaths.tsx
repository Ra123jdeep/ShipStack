"use client"

import { motion } from "framer-motion"
import { GraduationCap, Rocket, Building2, ArrowRight } from "lucide-react"
import Link from "next/link"

export function BuilderPaths() {
    const paths = [
        {
            title: "Students & Learners",
            icon: GraduationCap,
            desc: "Master modern stacks with curated educational blueprints.",
            color: "text-blue-400",
            border: "border-blue-500/20"
        },
        {
            title: "Indie Hackers",
            icon: Rocket,
            desc: "Ship MVPs in record time with production-ready boilerplates.",
            color: "text-orange-400",
            border: "border-orange-500/20"
        },
        {
            title: "Enterprise Teams",
            icon: Building2,
            desc: "Standardize tooling and enforce best practices at scale.",
            color: "text-purple-400",
            border: "border-purple-500/20"
        }
    ]

    return (
        <section className="py-24 px-4">
            <div className="container max-w-7xl mx-auto">

                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-white">Built for Every Stage</h2>
                    <p className="text-gray-400 mt-2">Whether you're learning or shipping, we have a path for you.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {paths.map((path, i) => (
                        <Link key={path.title} href={`/stack-generator?profile=${encodeURIComponent(path.title)}`} className="block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={`group glass-panel p-8 rounded-2xl border bg-white/[0.02] hover:bg-white/[0.05] transition-colors relative overflow-hidden h-full flex flex-col`}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-white/5 border ${path.border} flex items-center justify-center mb-6`}>
                                    <path.icon className={`w-6 h-6 ${path.color}`} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-3">{path.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">{path.desc}</p>

                                <div className="flex items-center text-sm font-medium text-white group-hover:text-blue-400 transition-colors mt-auto">
                                    Start Path <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}
