"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Command, Terminal, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const scenarios = [
    {
        text: (
            <>
                "I need a <span className="text-blue-400 font-medium">SaaS dashboard</span> for visualizing crypto trends with <span className="text-purple-400 font-medium">real-time updates</span>..."
            </>
        ),
        stack: [
            { name: "Next.js", type: "Frontend", color: "text-white" },
            { name: "Supabase", type: "Backend", color: "text-green-400" },
            { name: "Tailwind", type: "Styling", color: "text-blue-400" },
            { name: "Recoil", type: "State", color: "text-purple-400" },
        ]
    },
    {
        text: (
            <>
                "Build a <span className="text-blue-400 font-medium">AI Chatbot</span> that uses RAG to answer questions from <span className="text-purple-400 font-medium">PDF documents</span>..."
            </>
        ),
        stack: [
            { name: "React", type: "Frontend", color: "text-white" },
            { name: "FastAPI", type: "Backend", color: "text-green-400" },
            { name: "LangChain", type: "AI Logic", color: "text-blue-400" },
            { name: "Pinecone", type: "Vector DB", color: "text-purple-400" },
        ]
    },
    {
        text: (
            <>
                "Create an <span className="text-blue-400 font-medium">E-commerce store</span> with high performance and <span className="text-purple-400 font-medium">global payments</span>..."
            </>
        ),
        stack: [
            { name: "Next.js", type: "Frontend", color: "text-white" },
            { name: "Node.js", type: "Backend", color: "text-green-400" },
            { name: "Stripe", type: "Payments", color: "text-blue-400" },
            { name: "Redis", type: "Caching", color: "text-purple-400" },
        ]
    }
]

export function StackGeneratorPreview() {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % scenarios.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const currentScenario = scenarios[index]

    return (
        <section className="py-32 px-4 bg-[#0B0F17]">
            <div className="container max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Type it. Stack it. Ship it.</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Describe your dream project in plain English, and our AI Architect will assemble the perfect production-ready stack in seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:h-[600px]">

                    {/* Input Side (Left) */}
                    <div className="lg:col-span-2 bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10 flex flex-col justify-between relative overflow-hidden">
                        <div className="z-10 h-full flex flex-col">
                            <div className="flex items-center gap-2 text-blue-400 mb-6 font-mono text-sm">
                                <Terminal className="w-4 h-4" />
                                <span>INPUT PROMPT</span>
                            </div>

                            <div className="flex-1 flex items-center">
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5 }}
                                        className="text-2xl text-white font-light leading-relaxed"
                                    >
                                        {currentScenario.text}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>

                        <div className="z-10 mt-8">
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <motion.div
                                    key={index}
                                    className="h-full bg-blue-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 5, ease: "linear" }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2 font-mono">AI Analyzing requirements...</p>
                        </div>

                        {/* Background Grid */}
                        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
                    </div>

                    {/* Output Side (Right) */}
                    <div className="lg:col-span-3 bg-white/[0.02] rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col">
                        <div className="flex items-center justify-between mb-8 z-10">
                            <div className="flex items-center gap-2 text-green-400 font-mono text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>GENERATED STACK</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                        </div>

                        {/* Stack Cards */}
                        <div className="grid grid-cols-2 gap-4 z-10">
                            <AnimatePresence mode="wait">
                                {currentScenario.stack.map((tool, i) => (
                                    <motion.div
                                        key={`${index}-${tool.name}`}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ delay: i * 0.1, duration: 0.4 }}
                                        className="bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors"
                                    >
                                        <div className="text-xs text-gray-500 uppercase tracking-widest mb-2">{tool.type}</div>
                                        <div className={`text-xl font-bold ${tool.color}`}>{tool.name}</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-auto pt-8 z-10 flex justify-end">
                            <Link href="/stack-generator">
                                <Button className="rounded-full bg-white text-black hover:bg-gray-200">
                                    Try Interactive Generator <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
