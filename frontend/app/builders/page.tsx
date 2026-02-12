"use client"

import { Navbar } from "@/components/layout/Navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { ArrowRight, BookOpen, Rocket, ShieldCheck, Zap, Code2, Briefcase, CheckCircle2, Layers, Database, Globe, Server, Layout } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const personas = [
    {
        title: "Student & Learner",
        icon: BookOpen,
        description: "Focus on fundamentals, community support, and ease of learning.",
        gradient: "from-cyan-500 to-blue-500",
        borderGradient: "group-hover:from-cyan-500 group-hover:to-blue-500",
        features: ["Easy to setup", "Great documentation", "Large community"],
        recommended: ["Python", "Streamlit", "React", "SQLite"],
        stackIcons: [Layout, Code2, Database]
    },
    {
        title: "Indie Hacker & Founder",
        icon: Rocket,
        description: "Speed to market is everything. Ship fast, scale later.",
        gradient: "from-purple-500 to-pink-500",
        borderGradient: "group-hover:from-purple-500 group-hover:to-pink-500",
        features: ["Rapid development", "All-in-one solutions", "Low initial cost"],
        recommended: ["Next.js", "Supabase", "Tailwind CSS", "Vercel"],
        stackIcons: [Layout, Server, Rocket, Globe]
    },
    {
        title: "Enterprise Engineer",
        icon: Briefcase,
        description: "Stability, scalability, and strict type safety are paramount.",
        gradient: "from-emerald-500 to-teal-400",
        borderGradient: "group-hover:from-emerald-500 group-hover:to-teal-400",
        features: ["Type safety", "Microservices ready", "High performance"],
        recommended: ["Java / Spring", "PostgreSQL", "Docker", "Angular"],
        stackIcons: [Server, Database, ShieldCheck, Layers]
    }
]

export default function BuildersPage() {
    return (
        <main className="min-h-screen cosmic-bg relative overflow-hidden text-white selection:bg-purple-500/30">
            <Navbar />

            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen opacity-40" />
                <div className="absolute inset-0 grid-bg opacity-30" />
            </div>

            <section className="relative pt-24 pb-20 px-4 z-10">
                <div className="container max-w-6xl mx-auto">

                    {/* Header */}
                    <div className="text-center mb-20 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400 mb-4 backdrop-blur-md"
                        >
                            <SparklesIcon className="w-3 h-3 text-yellow-400" />
                            <span>Curated Paths</span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/50 glow-text"
                        >
                            Choose Your Builder Path
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
                        >
                            We've curated the perfect tech stacks based on your goals and experience level.
                        </motion.p>
                    </div>

                    {/* Personas Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {personas.map((persona, i) => (
                            <motion.div
                                key={persona.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + (i * 0.1) }}
                            >
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Card className="group h-full bg-[#0B0F17]/80 backdrop-blur-md border border-white/5 relative overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer hover:shadow-2xl hover:shadow-blue-500/10">
                                            {/* Animated Gradient Border */}
                                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${persona.borderGradient} -z-10 blur-xl`} />
                                            <div className="absolute inset-[1px] bg-[#0B0F17] rounded-xl -z-10" />

                                            <CardHeader>
                                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${persona.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500 relative overflow-hidden`}>
                                                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <persona.icon className="w-7 h-7 text-white relative z-10" />
                                                </div>
                                                <CardTitle className="text-2xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                                    {persona.title}
                                                </CardTitle>
                                                <CardDescription className="text-gray-400 text-sm leading-relaxed">
                                                    {persona.description}
                                                </CardDescription>
                                            </CardHeader>

                                            <CardContent className="space-y-6 flex flex-col h-full justify-between">
                                                <div className="space-y-3">
                                                    {persona.features.map((feature, idx) => (
                                                        <div key={feature} className="flex items-center text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                                                            <CheckCircle2 className={`w-4 h-4 mr-3 ${idx === 0 ? "text-green-400" : "text-gray-600 group-hover:text-gray-500"}`} />
                                                            {feature}
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="space-y-4">
                                                    {/* Mini Stack Preview */}
                                                    <div className="flex items-center gap-2 pt-4 border-t border-white/5">
                                                        <span className="text-[10px] uppercase font-bold text-gray-600 tracking-wider">Core Stack</span>
                                                        <div className="flex -space-x-2">
                                                            {persona.stackIcons.map((Icon, idx) => (
                                                                <div key={idx} className="w-7 h-7 rounded-full bg-[#111] border border-white/10 flex items-center justify-center z-10 group-hover:border-white/20 transition-colors">
                                                                    <Icon className="w-3.5 h-3.5 text-gray-400" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="w-full py-2 flex items-center justify-center text-sm font-medium text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1">
                                                        Explore Path <ArrowRight className="w-4 h-4 ml-2" />
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </DialogTrigger>

                                    <DialogContent className="sm:max-w-[600px] bg-[#0B0F17] border-white/10 text-white p-0 overflow-hidden gap-0">
                                        <div className={`h-32 w-full bg-gradient-to-r ${persona.gradient} relative overflow-hidden flex items-center px-8`}>
                                            <div className="absolute inset-0 bg-black/20" />
                                            <div className="absolute inset-0 grid-bg opacity-30" />
                                            <div className="relative z-10 flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-xl">
                                                    <persona.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div>
                                                    <DialogTitle className="text-2xl font-bold">{persona.title}</DialogTitle>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                                                            {persona.recommended.length} Tools
                                                        </Badge>
                                                        <span className="text-white/60 text-sm">Curated Bundle</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 space-y-8">
                                            <DialogDescription className="text-gray-400 text-base">
                                                {persona.description} This stack is curated to help you achieve your goals with minimize friction.
                                            </DialogDescription>

                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                                                    <Zap className="w-4 h-4 text-yellow-500" /> included Technologies
                                                </h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    {persona.recommended.map((tech) => (
                                                        <div key={tech} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors group">
                                                            <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center text-gray-400 group-hover:text-white transition-colors">
                                                                <Code2 className="w-4 h-4" />
                                                            </div>
                                                            <span className="font-medium text-gray-200">{tech}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Button
                                                className={`w-full py-6 text-lg font-semibold bg-gradient-to-r ${persona.gradient} hover:opacity-90 text-white shadow-xl hover:shadow-2xl transition-all`}
                                                onClick={() => {
                                                    const query = `Create a ${persona.title} project using ${persona.recommended.join(", ")}`
                                                    let profile = "Indie Hacker"
                                                    if (persona.title.includes("Student")) profile = "Student"
                                                    if (persona.title.includes("Enterprise")) profile = "Startup Founder"

                                                    window.location.href = `/stack-generator?query=${encodeURIComponent(query)}&profile=${encodeURIComponent(profile)}`
                                                }}
                                            >
                                                Initialize Project <Rocket className="w-5 h-5 ml-2" />
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
        </svg>
    )
}
