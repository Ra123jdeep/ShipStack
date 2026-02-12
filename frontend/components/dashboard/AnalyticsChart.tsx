"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp, Users, MousePointerClick } from "lucide-react"

export function AnalyticsChart() {
    return (
        <Card className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden group">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 z-10 relative">
                <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        Builder Activity
                    </h3>
                    <p className="text-sm text-gray-500">Real-time platform usage</p>
                </div>
                <div className="flex gap-4">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">2.4k</p>
                        <p className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1 justify-end">
                            <Users className="w-3 h-3" /> Active
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Visual - Enhanced SVG + Framer Motion */}
            <div className="relative h-48 w-full group">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="50%" stopColor="#8B5CF6" />
                            <stop offset="100%" stopColor="#EC4899" />
                        </linearGradient>
                    </defs>

                    {/* Horizontal Grid Lines */}
                    {[10, 20, 30, 40].map((y) => (
                        <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.1" />
                    ))}

                    {/* Path 1: Gradient Area */}
                    <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        d="M0 50 L0 35 C15 35 25 20 40 25 S65 40 75 30 S90 10 100 15 L100 50 Z"
                        fill="url(#chartGradient)"
                    />

                    {/* Path 2: Animated Line with Gradient Stroke */}
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        d="M0 35 C15 35 25 20 40 25 S65 40 75 30 S90 10 100 15"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />

                    {/* Interactive Focus Dots (Simulated) */}
                    <motion.circle
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        cx="40" cy="25" r="1.5" fill="white"
                    />
                    <motion.circle
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 2.5 }}
                        cx="75" cy="30" r="1.5" fill="white"
                    />

                </svg>

                {/* Interactive Tooltip Line (Visual only) */}
                <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-gradient-to-b from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute top-1/4 left-0 -translate-x-1/2 w-3 h-3 bg-[#0B0F17] border border-blue-400 rounded-full shadow-[0_0_15px_#3B82F6]" />

                    {/* Floating Tooltip */}
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 p-2 rounded-lg text-xs shadow-xl transform -translate-x-full">
                        <div className="text-gray-400">12:30 PM</div>
                        <div className="font-bold text-white flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-blue-400" /> 142 Events
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
