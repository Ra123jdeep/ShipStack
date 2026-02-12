"use client"

import { Navbar } from "@/components/layout/Navbar"
import { MetricsRow } from "@/components/insights/MetricsRow"
import { ToolActivityChart } from "@/components/insights/ToolActivityChart"
import { TopToolsList } from "@/components/insights/TopToolsList"
import { BuilderPathChart } from "@/components/insights/BuilderPathChart"
import { CompatibilityGraph } from "@/components/insights/CompatibilityGraph"
import { ActivityFeed } from "@/components/insights/ActivityFeed"
import { motion } from "framer-motion"

export default function InsightsPage() {
    return (
        <main className="min-h-screen cosmic-bg font-sans text-foreground">
            <Navbar />

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 grid-bg opacity-20" />
            </div>

            <div className="container relative z-10 mx-auto px-4 md:px-8 py-12 pt-24 max-w-7xl space-y-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
                >
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-white glow-text mb-2">
                            ShipStack Insights
                        </h1>
                        <p className="text-gray-400">
                            Real-time analytics on platform usage and stack generation trends.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Live system data
                    </div>
                </motion.div>

                {/* 1. Top Metrics */}
                <MetricsRow />

                {/* 2. Main Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-min">

                    {/* Row 1: Activity Chart (Wide) & Top Tools */}
                    <ToolActivityChart />
                    <div className="col-span-1 lg:col-span-1">
                        <TopToolsList />
                    </div>

                    {/* Row 2: Builder Path & Compatibility & Activity Feed */}
                    <div className="col-span-1 lg:col-span-1 h-[320px]">
                        <BuilderPathChart />
                    </div>
                    <div className="col-span-1 lg:col-span-1 h-[320px]">
                        <CompatibilityGraph />
                    </div>
                    <div className="col-span-1 md:col-span-2 lg:col-span-2 h-[320px]">
                        <ActivityFeed />
                    </div>

                </div>
            </div>
        </main>
    )
}
