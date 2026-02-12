"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, GraduationCap, Rocket, Briefcase } from "lucide-react"

const builderData = [
    { label: "Student", value: 35, color: "bg-blue-500", icon: GraduationCap },
    { label: "Indie Hacker", value: 45, color: "bg-purple-500", icon: Rocket },
    { label: "Enterprise", value: 20, color: "bg-green-500", icon: Briefcase },
]

export function BuilderPathChart() {
    return (
        <Card className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden flex flex-col h-full">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
                <Users className="w-4 h-4 text-purple-400" />
                Builder Paths
            </h3>

            <div className="flex-1 flex flex-col justify-center space-y-6">
                {builderData.map((item, index) => (
                    <div key={item.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400 flex items-center gap-2">
                                <item.icon className="w-3 h-3" /> {item.label}
                            </span>
                            <span className="text-white font-bold">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.value}%` }}
                                transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
                                className={`h-full ${item.color} rounded-full`}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-500 text-center">
                User segments based on stack selection behavior.
            </div>
        </Card>
    )
}
