"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function InsightsStrip() {
    const [stats, setStats] = useState({ total_stacks: 1240, active_builders: 85, tools_indexed: 154 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/analytics/stats`)
                if (res.ok) {
                    const data = await res.json()
                    setStats(data)
                }
            } catch (e) {
                console.error("Failed to fetch stats", e)
            }
        }
        fetchStats()
    }, [])

    return (
        <div className="w-full border-y border-white/5 bg-white/[0.02] backdrop-blur-sm">
            <div className="container mx-auto max-w-7xl px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5 text-center">

                    {[
                        { label: "Stacks Generated", value: stats.total_stacks.toLocaleString(), suffix: "+" },
                        { label: "Tools Indexed", value: stats.tools_indexed, suffix: "" },
                        { label: "Active Builders", value: stats.active_builders, suffix: "" },
                        { label: "Lines of Code", value: "2.5M", suffix: "+" } // Mocked for effect
                    ].map((stat, i) => (
                        <div key={i} className="px-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                                    {stat.value}<span className="text-blue-500/50 text-2xl">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-gray-500 uppercase tracking-widest mt-2 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
