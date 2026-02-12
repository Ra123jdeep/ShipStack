"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { ToolCard } from "@/components/tools/ToolCard"
import { ToolsFilter } from "@/components/tools/ToolsFilter"
import { motion } from "framer-motion"
import { Loader2, LayoutGrid, List } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface Tool {
    name: string
    description: string
    category: string
    trust_label: string
    official_url: string
    quote?: string
    tags?: string
}

export default function ToolsArchivePage() {
    const [tools, setTools] = useState<Tool[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCategory, setSelectedCategory] = useState("All")
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("search")?.toLowerCase() || ""

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

    useEffect(() => {
        if (searchQuery) {
            setSelectedCategory("All")
        }
    }, [searchQuery])

    const filteredTools = tools.filter(tool => {
        const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory
        const matchesSearch = searchQuery === "" ||
            tool.name.toLowerCase().includes(searchQuery) ||
            tool.description.toLowerCase().includes(searchQuery) ||
            tool.tags?.toLowerCase().includes(searchQuery)

        return matchesCategory && matchesSearch
    })

    return (
        <main className="min-h-screen cosmic-bg font-sans text-foreground">
            <Navbar />

            {/* Background Gradients */}
            <div className={`fixed inset-0 z-0 pointer-events-none`}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen opacity-50" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 pt-24">
                <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="hidden md:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-2 no-scrollbar">
                        <div className="mb-8">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Categories</h2>
                            <ToolsFilter
                                orientation="vertical"
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="space-y-8">
                        <div className="flex flex-col gap-2 mb-8">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-3"
                            >
                                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                                    <List className="w-6 h-6 text-blue-400" />
                                </div>
                                <h1 className="text-4xl font-bold tracking-tight text-white glow-text">
                                    Tools Archive
                                </h1>
                            </motion.div>
                            <p className="text-gray-400 text-lg max-w-2xl pl-14">
                                Browse the complete collection of implementation-ready tools.
                            </p>
                        </div>

                        {loading ? (
                            <div className="flex justify-center py-20">
                                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 grid-flow-dense">
                                {filteredTools.map((tool, i) => {
                                    // Make the first item and every 7th item span 2 columns if not on mobile
                                    const isFeatured = i === 0 || i % 7 === 0;
                                    const spanClass = isFeatured ? "md:col-span-2" : "col-span-1";

                                    return (
                                        <motion.div
                                            key={tool.name}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className={spanClass}
                                        >
                                            <ToolCard
                                                name={tool.name}
                                                description={tool.description}
                                                category={tool.category}
                                                trust_label={tool.trust_label as any}
                                                trust_score={Math.floor(Math.random() * (99 - 80) + 80)}
                                                official_url={tool.official_url}
                                                tags={tool.tags}
                                            />
                                        </motion.div>
                                    )
                                })}
                                {filteredTools.length === 0 && (
                                    <div className="col-span-full py-20 text-center text-gray-500 glass-panel rounded-xl">
                                        No tools found in this category.
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
