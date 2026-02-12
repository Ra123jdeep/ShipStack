"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ArrowUpRight, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

interface ToolCardProps {
    id?: number;
    name: string;
    description: string;
    category: string;
    trust_label?: "Stable" | "Trending" | "Experimental";
    trust_score?: number;
    official_url?: string;
    tags?: string;
    usageStat?: string;
    trendLabel?: string;
}

const getCategoryColor = (category: string) => {
    const c = category.toLowerCase()
    if (c.includes("frontend")) return "text-cyan-400 group-hover:text-cyan-300"
    if (c.includes("backend")) return "text-green-400 group-hover:text-green-300"
    if (c.includes("database")) return "text-amber-400 group-hover:text-amber-300"
    if (c.includes("ai")) return "text-purple-400 group-hover:text-purple-300"
    return "text-blue-400 group-hover:text-blue-300"
}

const TrustScoreRing = ({ score }: { score: number }) => {
    const radius = 18
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (score / 100) * circumference

    let color = "stroke-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]";
    if (score < 80) color = "stroke-amber-500";
    if (score < 60) color = "stroke-red-500";

    return (
        <div className="relative flex items-center justify-center w-12 h-12">
            <svg className="transform -rotate-90 w-12 h-12 drop-shadow-lg">
                <circle
                    className="text-white/10"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="24"
                    cy="24"
                />
                <motion.circle
                    className={color}
                    strokeWidth="3"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="24"
                    cy="24"
                />
            </svg>
            <span className="absolute text-[10px] font-bold text-white">{score}</span>
        </div>
    )
}

export function ToolCard({ id, name, description, category, trust_label, trust_score = 95, official_url, tags, usageStat, trendLabel }: ToolCardProps) {
    const isRecommended = (trust_score || 0) > 90
    const colorClass = getCategoryColor(category)
    const displayTags = tags ? tags.split(",").slice(0, 3) : ["#dev", "#tool"]

    // 3D Tilt Effect
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseXSpring = useSpring(x)
    const mouseYSpring = useSpring(y)

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const handleTrackClick = async () => {
        try {
            // Basic tracking call - customize URL as needed
            await fetch('http://localhost:8000/api/v1/analytics/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event_type: 'click',
                    tool_id: id,
                    event_metadata: { tool_name: name, category }
                }),
            });
        } catch (error) {
            console.error('Error tracking click:', error);
        }
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="perspective-1000 h-full"
        >
            <Card className={`group glass-card relative overflow-hidden border-white/5 hover:border-white/20 transition-all duration-300 h-full flex flex-col bg-[#0B0F17]/60 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10`}>
                <CardHeader className="flex flex-row items-start justify-between p-5 pb-2 space-y-0 relative z-10">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            {/* Category Badge */}
                            <span className={`text-[10px] font-bold uppercase tracking-widest ${colorClass} transition-colors`}>
                                {category}
                            </span>
                            {isRecommended && (
                                <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] px-1.5 py-0">
                                    <Sparkles className="w-3 h-3 mr-1 inline" /> AI Pick
                                </Badge>
                            )}
                        </div>
                        <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors tracking-tight">
                            {name}
                        </h3>
                    </div>
                    <TrustScoreRing score={trust_score || 0} />
                </CardHeader>
                <CardContent className="flex-1 p-5 pt-0 relative z-10">
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {displayTags.map((tag: string, i: number) => (
                            <span key={i} className="text-[10px] text-gray-500 bg-white/5 px-2 py-1 rounded-md border border-white/5 group-hover:border-white/10 transition-colors">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Stats & Trends Section */}
                    {(usageStat || trendLabel) ? (
                        <div className="mt-3 pt-4 border-t border-white/5 flex items-center justify-between">
                            {usageStat && (
                                <span className="text-[10px] text-gray-500 font-medium flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                    {usageStat}
                                </span>
                            )}
                            {trendLabel && (
                                <span className="text-[10px] text-green-400 font-medium bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">
                                    {trendLabel}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/50" />
                                <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500/50" />
                                <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/50" />
                            </div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Part of your architecture</span>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="p-5 pt-2 relative z-10">
                    <Button asChild variant="ghost" className="w-full justify-between hover:bg-white/5 hover:text-white border border-white/5 hover:border-white/10 group/btn transition-all duration-300" onClick={handleTrackClick}>
                        <Link href={official_url || "#"} target="_blank">
                            <span className="text-gray-400 group-hover/btn:text-white font-medium">View Details</span>
                            <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover/btn:text-white group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </Link>
                    </Button>
                </CardFooter>

                {/* Background Grid Pattern */}
                <div className="absolute inset-0 grid-bg opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-20" />
            </Card>
        </motion.div>
    )
}
