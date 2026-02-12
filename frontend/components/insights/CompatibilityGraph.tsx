"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Share2 } from "lucide-react"

export function CompatibilityGraph() {
    return (
        <Card className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden group">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
                <Share2 className="w-4 h-4 text-green-400" />
                Compatibility
            </h3>
            <p className="text-xs text-gray-500 mb-4">Most paired technologies</p>

            <div className="relative h-48 w-full flex items-center justify-center">
                <div className="relative w-full h-full">
                    {/* SVG Connections */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Next.js -> Vercel */}
                        <motion.line
                            x1="20%" y1="50%" x2="50%" y2="20%"
                            stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5 }}
                        />
                        {/* Next.js -> Tailwind */}
                        <motion.line
                            x1="20%" y1="50%" x2="50%" y2="80%"
                            stroke="#3B82F6" strokeWidth="2" strokeOpacity="0.3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                        />
                        {/* FastAPI -> Postgres */}
                        <motion.line
                            x1="80%" y1="50%" x2="50%" y2="50%"
                            stroke="#10B981" strokeWidth="2" strokeOpacity="0.3"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.5, delay: 0.4 }}
                        />
                    </svg>

                    {/* Nodes */}
                    {/* Next.js */}
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                        className="absolute left-[10%] top-[40%] text-center"
                    >
                        <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10 relative">
                            <span className="text-[10px] font-bold text-white">Next</span>
                        </div>
                    </motion.div>

                    {/* Vercel */}
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.7 }}
                        className="absolute left-[45%] top-[5%] text-center"
                    >
                        <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10 relative">
                            <span className="text-[8px] font-bold text-white">Vercel</span>
                        </div>
                    </motion.div>

                    {/* Tailwind */}
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9 }}
                        className="absolute left-[45%] top-[75%] text-center"
                    >
                        <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)] z-10 relative">
                            <span className="text-[8px] font-bold text-blue-400">Tailwind</span>
                        </div>
                    </motion.div>

                    {/* Postgres */}
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }}
                        className="absolute right-[40%] top-[40%] text-center"
                    >
                        <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] z-10 relative">
                            <span className="text-[8px] font-bold text-green-400">PG</span>
                        </div>
                    </motion.div>

                    {/* FastAPI */}
                    <motion.div
                        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }}
                        className="absolute right-[10%] top-[40%] text-center"
                    >
                        <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.2)] z-10 relative">
                            <span className="text-[10px] font-bold text-green-400">FastAPI</span>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="mt-4 text-center">
                <p className="text-xs text-blue-400 font-mono">Next.js + Vercel = 89% Match</p>
            </div>
        </Card>
    )
}
