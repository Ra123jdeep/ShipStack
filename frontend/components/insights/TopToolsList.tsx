"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Trophy, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { useEffect, useState } from "react"

const topTools = [
    { name: "Next.js", count: 1245, trend: "+12%", trendUp: true },
    { name: "FastAPI", count: 982, trend: "+8%", trendUp: true },
    { name: "PostgreSQL", count: 876, trend: "+5%", trendUp: true },
    { name: "Vercel", count: 754, trend: "+15%", trendUp: true },
    { name: "Tailwind CSS", count: 643, trend: "-2%", trendUp: false },
]

export function TopToolsList() {
    const [tools, setTools] = useState<any[]>(topTools);

    useEffect(() => {
        fetch('/api/analytics/stats')
            .then(res => res.json())
            .then(data => {
                if (data.top_tools && data.top_tools.length > 0) {
                    setTools(data.top_tools);
                } else {
                    setTools(topTools); // Fallback to dummy if no data
                }
            })
            .catch(err => {
                console.error(err);
                setTools(topTools);
            });
    }, []);

    return (
        <Card className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden h-full flex flex-col">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
                <Trophy className="w-4 h-4 text-yellow-400" />
                Most Selected Tools
            </h3>

            <div className="space-y-4 flex-1">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-gray-500 w-4">#{index + 1}</span>
                            <div>
                                <p className="text-sm font-medium text-white">{tool.name}</p>
                                <div className="h-1 w-24 bg-white/5 rounded-full mt-1 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(tool.count / 1500) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        className="h-full bg-blue-500/50 rounded-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <p className="text-sm font-bold text-gray-300">{tool.count}</p>
                            <span className={`text-[10px] flex items-center justify-end gap-0.5 ${tool.trendUp ? 'text-green-400' : 'text-red-400'}`}>
                                {tool.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {tool.trend}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-center">
                <button className="text-xs text-gray-500 hover:text-white transition-colors">View All Tools</button>
            </div>
        </Card>
    )
}
