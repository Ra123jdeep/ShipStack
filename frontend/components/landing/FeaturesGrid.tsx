"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Users, Github, BookOpen, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const features = [
    {
        title: "Team Workspaces",
        desc: "Collaborate on stack planning in real-time. Share architectures and manage permissions seamlessly.",
        icon: Users,
        color: "text-blue-400",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        details: {
            headline: "Built for High-Velocity Teams",
            longDesc: "Stop sharing screenshots and start sharing live architectures. ShipStack Workspaces allow your entire engineering team to collaborate on stack decisions, review dependencies, and manage meaningful access controls.",
            benefits: [
                "Real-time multiplayer editing",
                "Role-based access control (RBAC)",
                "Comment threads on specific nodes",
                "Version history and rollback"
            ]
        }
    },
    {
        title: "GitHub Integration",
        desc: "Auto-detect your current stack from existing repositories. Sync changes and blueprints automatically.",
        icon: Github,
        color: "text-purple-400",
        bg: "bg-purple-500/10",
        border: "border-purple-500/20",
        details: {
            headline: "Sync with your Source of Truth",
            longDesc: "ShipStack connects directly to your GitHub organization to analyze your `package.json`, `requirements.txt`, and Dockerfiles. We automatically generate a visual map of your architecture and keep it in sync with every commit.",
            benefits: [
                "One-click repository scanning",
                "Automated drift detection",
                "PR comments with stack changes",
                "Bi-directional sync"
            ]
        }
    },
    {
        title: "Deployment Guides",
        desc: "Step-by-step interactive tutorials tailored to your specific stack. Go from localhost to production in minutes.",
        icon: BookOpen,
        color: "text-green-400",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
        details: {
            headline: "From Localhost to Global Scale",
            longDesc: "Never get stuck in configuration hell again. Our AI generates a custom deployment guide based on your exact stack combination, covering everything from environment variables to CI/CD pipelines.",
            benefits: [
                "Custom Terraform / Pulumi scripts",
                "CI/CD workflow generation",
                "Security best practices checklist",
                "Cost estimation calculator"
            ]
        }
    },
    {
        title: "Performance Benchmarks",
        desc: "Compare real-world metrics of different tech combinations. Make data-driven decisions for your infrastructure.",
        icon: BarChart3,
        color: "text-orange-400",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        details: {
            headline: "Data-Driven Architecture",
            longDesc: "Don't guess which database is faster. See real-world benchmarks for thousands of stack combinations, sourced from the community and our own high-load stress tests.",
            benefits: [
                "Latency & Throughput comparisons",
                "Cold-start time analysis",
                "Memory footprint projections",
                "Regional latency heatmaps"
            ]
        }
    }
]

export function FeaturesGrid() {
    const [selectedFeature, setSelectedFeature] = useState<typeof features[0] | null>(null)

    return (
        <section className="py-24 px-4 bg-[#0B0F17]">
            <div className="container max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                        Everything you need to <span className="text-blue-500">Scale.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        ShipStack isn't just a generator. It's a complete ecosystem for modern development teams.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, i) => (
                        <div
                            key={feature.title}
                            onClick={() => setSelectedFeature(feature)}
                            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] p-8 hover:bg-white/[0.04] transition-colors cursor-pointer"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-500">
                                <feature.icon className={`w-32 h-32 ${feature.color}`} />
                            </div>

                            <div className={`w-12 h-12 rounded-xl border ${feature.border} ${feature.bg} flex items-center justify-center mb-6`}>
                                <feature.icon className={`w-6 h-6 ${feature.color}`} />
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
                                {feature.desc}
                            </p>

                            <div className={`flex items-center text-sm font-medium ${feature.color} transition-all duration-300`}>
                                Learn more <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    ))}
                </div>

                <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
                    <DialogContent className="sm:max-w-[600px] bg-[#0B0F17] border border-white/10 text-white">
                        {selectedFeature && (
                            <>
                                <DialogHeader>
                                    <div className={`w-12 h-12 rounded-xl border ${selectedFeature.border} ${selectedFeature.bg} flex items-center justify-center mb-4`}>
                                        <selectedFeature.icon className={`w-6 h-6 ${selectedFeature.color}`} />
                                    </div>
                                    <DialogTitle className="text-2xl font-bold">{selectedFeature.title}</DialogTitle>
                                    <div className="text-lg font-medium text-blue-400 mt-1">{selectedFeature.details.headline}</div>
                                </DialogHeader>

                                <div className="mt-4 space-y-6">
                                    <DialogDescription className="text-gray-400 text-base leading-relaxed">
                                        {selectedFeature.details.longDesc}
                                    </DialogDescription>

                                    <div className="space-y-3">
                                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Key Benefits</h4>
                                        <div className="grid grid-cols-1 gap-2">
                                            {selectedFeature.details.benefits.map((benefit, i) => (
                                                <div key={i} className="flex items-center gap-3 text-gray-300">
                                                    <CheckCircle2 className={`w-4 h-4 ${selectedFeature.color}`} />
                                                    <span>{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 flex justify-end">
                                        <Button onClick={() => setSelectedFeature(null)} className="bg-white text-black hover:bg-gray-200">
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>

            </div>
        </section>
    )
}
