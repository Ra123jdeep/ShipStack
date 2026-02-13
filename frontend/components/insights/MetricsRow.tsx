"use client"

import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useState } from "react"
import { Users, Layers, Star, Zap } from "lucide-react"

const Counter = ({ from, to }: { from: number; to: number }) => {
    const count = useMotionValue(from)
    const rounded = useTransform(count, (latest) => Math.round(latest))

    useEffect(() => {
        const animation = animate(count, to, { duration: 2, ease: "easeOut" })
        return animation.stop
    }, [count, to])

    return <motion.span>{rounded}</motion.span>
}

export function MetricsRow() {
    const [stats, setStats] = useState({
        total_clicks: 0,
        total_stacks: 0,
        active_builders: 0
    });

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/analytics/stats`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
                title="Total Stacks Generated"
                value={stats.total_stacks}
                icon={Layers}
                color="text-blue-400"
                trend="+12%"
            />
            <MetricCard
                title="Active Builders"
                value={stats.active_builders}
                icon={Users}
                color="text-green-400"
                trend="+8%"
            />
            <MetricCard
                title="Tools Clicked"
                value={stats.total_clicks}
                icon={Star}
                color="text-yellow-400"
                trend="+15%"
            />
            <MetricCard
                title="Avg. Stack Speed"
                value={45} // ms or arbitrary score
                suffix="ms"
                icon={Zap}
                color="text-purple-400"
                trend="-5%" // faster
                trendColor="text-green-400"
            />
        </div>
    )
}

function MetricCard({ title, value, icon: Icon, color, trend, suffix = "", trendColor = "text-green-400" }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden group hover:border-white/10 transition-colors"
        >
            <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
                <Icon className="w-16 h-16" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${color}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm text-gray-400">{title}</span>
                </div>

                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-white">
                        <Counter from={0} to={value} />{suffix}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full bg-white/5 border border-white/5 ${trendColor}`}>
                        {trend}
                    </span>
                </div>
            </div>
        </motion.div>
    )
}
