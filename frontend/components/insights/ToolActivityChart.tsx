"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { TrendingUp, MousePointerClick, Layers } from "lucide-react"

export function ToolActivityChart() {
    return (
        <Card className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden group col-span-2 md:col-span-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 z-10 relative">
                <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                        Platform Activity
                    </h3>
                    <p className="text-sm text-gray-500">Real-time tool selection & generation events</p>
                </div>
                <div className="flex gap-6">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">42.5k</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1 justify-end">
                            <MousePointerClick className="w-3 h-3 text-blue-400" /> Clicks
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-bold text-white">12.8k</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider flex items-center gap-1 justify-end">
                            <Layers className="w-3 h-3 text-purple-400" /> Stacks
                        </p>
                    </div>
                </div>
            </div>

            {/* Chart Visual - SVG + Framer Motion */}
            <div className="relative h-64 w-full">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="chartGradientBlue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="chartGradientPurple" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#A855F7" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area 1: Blue (Clicks) */}
                    <motion.path
                        initial={{ opacity: 0, d: "M0 50 L0 50 L100 50 L100 50 Z" }}
                        animate={{ opacity: 1, d: "M0 50 L0 35 Q20 15 40 30 T80 20 L100 10 L100 50 Z" }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        fill="url(#chartGradientBlue)"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        d="M0 35 Q20 15 40 30 T80 20 L100 10"
                        fill="none"
                        stroke="#3B82F6"
                        strokeWidth="0.5"
                    />

                    {/* Area 2: Purple (Stacks) */}
                    <motion.path
                        initial={{ opacity: 0, d: "M0 50 L0 50 L100 50 L100 50 Z" }}
                        animate={{ opacity: 1, d: "M0 50 L0 45 Q25 40 50 35 T90 30 L100 25 L100 50 Z" }}
                        transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
                        fill="url(#chartGradientPurple)"
                    />
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
                        d="M0 45 Q25 40 50 35 T90 30 L100 25"
                        fill="none"
                        stroke="#A855F7"
                        strokeWidth="0.5"
                    />

                    {/* Grid Lines */}
                    <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeOpacity="0.05" strokeWidth="0.1" />
                    <line x1="0" y1="20" x2="100" y2="20" stroke="white" strokeOpacity="0.05" strokeWidth="0.1" />
                    <line x1="0" y1="30" x2="100" y2="30" stroke="white" strokeOpacity="0.05" strokeWidth="0.1" />
                    <line x1="0" y1="40" x2="100" y2="40" stroke="white" strokeOpacity="0.05" strokeWidth="0.1" />

                </svg>

                {/* Interactive Tooltip Line (Visual only) */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute top-[20%] left-0 -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#3B82F6]" />
                    <div className="absolute top-[60%] left-0 -translate-x-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_10px_#A855F7]" />

                    {/* Tooltip Box */}
                    <div className="absolute top-10 left-4 bg-black/80 backdrop-blur border border-white/10 p-2 rounded text-xs text-gray-300">
                        <div className="flex items-center gap-2 mb-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-400" /> 1.2k Clicks</div>
                        <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-400" /> 450 Stacks</div>
                    </div>
                </div>
            </div>
        </Card>
    )
}
