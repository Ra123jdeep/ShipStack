"use client"

import { motion } from "framer-motion"
import { Database, Layout, Server, Shield, Globe, Cpu, Layers } from "lucide-react"

interface StackVisualizerProps {
    stack: any
    loading: boolean
}

const getIconForRole = (role: string) => {
    const r = role.toLowerCase()
    if (r.includes("frontend") || r.includes("ui")) return <Layout className="w-5 h-5 text-cyan-400" />
    if (r.includes("backend") || r.includes("api")) return <Server className="w-5 h-5 text-green-400" />
    if (r.includes("database") || r.includes("store")) return <Database className="w-5 h-5 text-amber-400" />
    if (r.includes("auth")) return <Shield className="w-4 h-4 text-red-400" />
    if (r.includes("deployment") || r.includes("hosting")) return <Globe className="w-5 h-5 text-blue-400" />
    return <Cpu className="w-5 h-5 text-purple-400" />
}

const getRoleLevel = (role: string) => {
    const r = role.toLowerCase()
    if (r.includes("frontend") || r.includes("ui")) return 0
    if (r.includes("backend") || r.includes("api")) return 1
    if (r.includes("auth")) return 1
    if (r.includes("database") || r.includes("store")) return 2
    if (r.includes("deployment") || r.includes("hosting")) return 3
    return 1
}

const getCategoryColor = (role: string) => {
    const r = role.toLowerCase()
    if (r.includes("frontend")) return "border-cyan-500/30 shadow-cyan-500/20"
    if (r.includes("backend")) return "border-green-500/30 shadow-green-500/20"
    if (r.includes("database")) return "border-amber-500/30 shadow-amber-500/20"
    if (r.includes("deployment")) return "border-blue-500/30 shadow-blue-500/20"
    return "border-purple-500/30 shadow-purple-500/20"
}

export function StackVisualizer({ stack, loading }: StackVisualizerProps) {
    if (loading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-cyan-500/20 rounded-full animate-ping" />
                    <div className="absolute inset-0 border-4 border-t-cyan-500 rounded-full animate-spin" />
                </div>
                <p className="text-cyan-400 animate-pulse font-mono tracking-widest text-xs uppercase">Architecting System...</p>
            </div>
        )
    }

    if (!stack) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center space-y-6 opacity-30">
                <div className="w-32 h-32 rounded-full border border-dashed border-white/20 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                    <Layers className="w-12 h-12 text-gray-600 animate-reverse-spin" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-300 tracking-tight">SYSTEM IDLE</h3>
                    <p className="text-xs text-gray-500 max-w-xs mx-auto font-mono uppercase">
                        Awaiting Project Specifications
                    </p>
                </div>
            </div>
        )
    }

    const components = Object.entries(stack.components || {})
    // Group by level
    const levels: Record<number, typeof components> = { 0: [], 1: [], 2: [], 3: [] }
    components.forEach(c => {
        const level = getRoleLevel(c[0])
        if (!levels[level]) levels[level] = []
        levels[level].push(c)
    })

    return (
        <div className="h-full w-full flex flex-col items-center relative overflow-hidden p-8 bg-[#030711]">
            <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

            {/* Title / Header */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="z-20 text-center mb-8 relative"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Architecture Online</span>
                </div>
                <h2 className="text-3xl font-bold text-white tracking-tight mb-2 glow-text">{stack.name}</h2>
            </motion.div>

            {/* Architecture Graph */}
            <div className="relative w-full max-w-3xl flex-1 flex flex-col items-center justify-center gap-12 z-10">
                {/* SVG Connections Layer */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                    <line x1="50%" y1="15%" x2="50%" y2="40%" stroke="url(#gradient-line)" strokeWidth="2" />
                    <line x1="50%" y1="50%" x2="50%" y2="75%" stroke="url(#gradient-line)" strokeWidth="2" />
                    <defs>
                        <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#22d3ee" />
                            <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Level 0: Frontend */}
                <div className="flex gap-6 justify-center">
                    {levels[0].map(([role, tool]: [string, any], i) => (
                        <Node key={role} role={role} tool={tool} index={i} level={0} />
                    ))}
                </div>

                {/* Level 1: Backend / API / Auth */}
                <div className="flex gap-6 justify-center">
                    {levels[1].map(([role, tool]: [string, any], i) => (
                        <Node key={role} role={role} tool={tool} index={i} level={1} />
                    ))}
                </div>

                {/* Level 2: Database */}
                <div className="flex gap-6 justify-center">
                    {levels[2].map(([role, tool]: [string, any], i) => (
                        <Node key={role} role={role} tool={tool} index={i} level={2} />
                    ))}
                </div>

                {/* Level 3: Deployment */}
                <div className="flex gap-6 justify-center">
                    {levels[3].map(([role, tool]: [string, any], i) => (
                        <Node key={role} role={role} tool={tool} index={i} level={3} />
                    ))}
                </div>
            </div>
        </div>
    )
}

function Node({ role, tool, index, level }: { role: string, tool: string, index: number, level: number }) {
    const colorClass = getCategoryColor(role)

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: level * 0.2 + index * 0.1, type: "spring" }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
        >
            <div className={`
                glass-card w-48 p-4 rounded-xl border flex flex-col items-center text-center gap-3 
                transition-all duration-500 hover:bg-white/10
                ${colorClass}
            `}>
                <div className="shrink-0 p-3 rounded-lg bg-black/40 border border-white/5 shadow-inner">
                    {getIconForRole(role)}
                </div>
                <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{role}</p>
                    <p className="text-sm font-semibold text-white truncate">{tool}</p>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl -z-10" />
            </div>

            {/* Tooltip-ish label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-gray-400 whitespace-nowrap font-mono">
                System Node: Active
            </div>
        </motion.div>
    )
}
