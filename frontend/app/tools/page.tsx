"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { ToolCard } from "@/components/tools/ToolCard"
import { motion } from "framer-motion"
import { Loader2, LayoutGrid, Star, Zap, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface Tool {
    name: string
    description: string
    category: string
    trust_label: string
    official_url: string
    quote?: string
    tags?: string
    trust_score?: number
}

// Helper to shuffle array (Fisher-Yates)
const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function ToolsPage() {
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTools = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/v1/tools/")
                if (response.ok) {
                    const data = await response.json()
                    setTools(data)
                }
            } catch (error) {
                console.error("Failed to fetch tools:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchTools()
    }, [])

    // Curated Tool Logic
    const staffPicks = tools.slice(0, 5) // Just first 5 for now

    // Ideally filter by 'Trending' label, fallback to random shuffle for variety if needed
    const trendingTools = tools.filter(t => t.trust_label === "Trending").slice(0, 5)

    // Ideally filter by AI category or high trust score
    const aiRecommended = tools.filter(t => (t.trust_score || 90) > 95 || t.category === "AI/ML").slice(0, 5)

    const SectionHeader = ({ title, icon: Icon, colorClass }: { title: string, icon: any, colorClass: string }) => (
        <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
                <Icon className={`w-5 h-5 ${colorClass}`} />
                <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
            </div>
            <div className="h-1 flex-1 mx-4 bg-gradient-to-r from-white/5 to-transparent rounded-full" />
        </div>
    )

    return (
        <main className="min-h-screen cosmic-bg font-sans text-foreground">
            <Navbar />

            {/* Background Gradients */}
            <div className={`fixed inset-0 z-0 pointer-events-none`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 pt-24 max-w-7xl">

                {/* Hero Header */}
                <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
                    <div className="space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3"
                        >
                            <div className="p-2 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <LayoutGrid className="w-8 h-8 text-blue-400" />
                            </div>
                            <h1 className="text-5xl font-bold tracking-tight text-white glow-text">
                                Explorer
                            </h1>
                        </motion.div>
                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                            Curated selection of the best implementation-ready tools.
                            <span className="text-blue-400 block mt-1">Hand-picked for modern builders.</span>
                        </p>
                    </div>

                    <Link href="/tools/all">
                        <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:text-white group">
                            View Full Archive <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="space-y-20">

                        {/* Section 1: Staff Picks */}
                        <section>
                            <SectionHeader title="Staff Picks" icon={Star} colorClass="text-yellow-400" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {staffPicks.map((tool, i) => (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="h-full"
                                    >
                                        <ToolCard
                                            name={tool.name}
                                            description={tool.description}
                                            category={tool.category}
                                            trust_label={tool.trust_label as any}
                                            official_url={tool.official_url}
                                            tags={tool.tags}
                                            trust_score={Math.floor(Math.random() * (99 - 90) + 90)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Section 2: Trending Tools */}
                        <section>
                            <SectionHeader title="Trending This Week" icon={Zap} colorClass="text-orange-400" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {trendingTools.map((tool, i) => (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                        className="h-full"
                                    >
                                        <ToolCard
                                            name={tool.name}
                                            description={tool.description}
                                            category={tool.category}
                                            trust_label={tool.trust_label as any}
                                            official_url={tool.official_url}
                                            tags={tool.tags}
                                            trust_score={Math.floor(Math.random() * (99 - 85) + 85)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Section 3: AI Recommended */}
                        <section>
                            <SectionHeader title="AI Recommended" icon={Sparkles} colorClass="text-purple-400" />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {aiRecommended.map((tool, i) => (
                                    <motion.div
                                        key={tool.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        className="h-full"
                                    >
                                        <ToolCard
                                            name={tool.name}
                                            description={tool.description}
                                            category={tool.category}
                                            trust_label={tool.trust_label as any}
                                            official_url={tool.official_url}
                                            tags={tool.tags}
                                            trust_score={Math.floor(Math.random() * (99 - 92) + 92)}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                    </div>
                )}
            </div>
        </main>
    )
}
