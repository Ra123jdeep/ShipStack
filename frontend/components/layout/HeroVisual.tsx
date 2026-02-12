"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ArrowUpRight, Database, Layout, Sparkles, Wind, Box, Shield, Zap } from "lucide-react"

const cards = [
    {
        name: "Vercel",
        tag: "STAFF PICK",
        desc: "Zero-config frontend deployment",
        icon: ArrowUpRight,
        color: "bg-black text-white",
        glow: "shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)]",
        pos: "top-0 right-10 z-30",
        rotate: 6,
        score: 94
    },
    {
        name: "Pinecone",
        tag: "VECTOR DB",
        desc: "High-performance vector database",
        icon: Database,
        color: "bg-emerald-900/50 text-emerald-400 border-emerald-500/30",
        glow: "shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]",
        pos: "top-32 right-0 z-20",
        rotate: -3,
        score: 89
    },
    {
        name: "OpenAI",
        tag: "AI APIS",
        desc: "Powerful language models and APIs",
        icon: Sparkles,
        color: "bg-purple-900/50 text-purple-400 border-purple-500/30",
        glow: "shadow-[0_0_30px_-5px_rgba(168,85,247,0.3)]",
        pos: "top-48 right-12 z-40",
        rotate: 4,
        score: 98
    },
    {
        name: "Tailwind CSS",
        tag: "UI KIT",
        desc: "Prebuilt components for modern UIs",
        icon: Wind,
        color: "bg-cyan-900/50 text-cyan-400 border-cyan-500/30",
        glow: "shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]",
        pos: "bottom-32 right-32 z-10",
        rotate: -6,
        score: 96
    },
    {
        name: "T3 Stack",
        tag: "FULL STACK",
        desc: "Next.js, TypeScript, Tailwind CSS, Prisma",
        icon: Box,
        color: "bg-blue-900/50 text-blue-400 border-blue-500/30",
        glow: "shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]",
        pos: "bottom-0 right-10 z-50",
        rotate: -2,
        score: 97
    }
]

export function HeroVisual() {
    return (
        <div className="relative w-full h-[650px] hidden lg:block perspective-1000">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse-slow" />
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse-slow" />

            {cards.map((card, i) => (
                <motion.div
                    key={card.name}
                    className={`absolute ${card.pos}`}
                    initial={{ opacity: 0, y: 100, rotate: 0 }}
                    animate={{
                        opacity: 1,
                        y: [0, -10, 0],
                        rotate: [card.rotate, card.rotate - 2, card.rotate]
                    }}
                    transition={{
                        opacity: { duration: 0.8, delay: i * 0.2 },
                        y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                        rotate: { duration: 8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }
                    }}
                >
                    <div className={`relative group`}>
                        {/* Card Glow */}
                        <div className={`absolute -inset-0.5 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500 ${card.glow}`} />

                        <Card className="relative glass w-[320px] p-0 overflow-hidden border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl">
                            {/* Card Content */}
                            <div className="p-5 relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-2.5 rounded-xl border border-white/10 ${card.color}`}>
                                        <card.icon className="w-6 h-6" />
                                    </div>
                                    <div className="relative">
                                        {/* Circular Score */}
                                        <svg className="w-10 h-10 rotate-[-90deg]">
                                            <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-gray-800" />
                                            <circle cx="20" cy="20" r="18" fill="transparent" stroke="currentColor" strokeWidth="2" className="text-white" strokeDasharray="113" strokeDashoffset={113 - (113 * card.score) / 100} />
                                        </svg>
                                        <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                                            {card.score}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1 mb-4">
                                    <div className="flex items-center gap-2">
                                        <h3 className="font-bold text-xl text-white tracking-tight">{card.name}</h3>
                                        <Badge variant="outline" className="text-[10px] px-1.5 h-5 border-white/20 text-gray-300 bg-white/5">
                                            {card.tag}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-gray-400 leading-relaxed font-medium line-clamp-2">
                                        {card.desc}
                                    </p>
                                </div>

                                <div className="border-t border-white/10 pt-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-500">
                                        <Shield className="w-3 h-3" />
                                        <span>Trust Score</span>
                                        <span className="text-gray-300 ml-1">9.86 / 10</span>
                                    </div>
                                    <Button size="sm" className="h-7 textxs bg-white/10 hover:bg-white/20 text-white border border-white/10">
                                        Visit Tool <ArrowRight className="ml-1 w-3 h-3" />
                                    </Button>
                                </div>
                            </div>

                            {/* Inner Shine */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        </Card>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}
