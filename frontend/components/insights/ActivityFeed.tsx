"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Activity, Zap, Plus, Info } from "lucide-react"
import { useEffect, useState } from "react"


interface ActivityEvent {
    id: number;
    text: string;
    time: string;
    icon?: any;
    color?: string;
}

export function ActivityFeed() {
    const [events, setEvents] = useState<ActivityEvent[]>([])

    useEffect(() => {
        // Initial fetch
        const fetchEvents = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/analytics/stats`);
                const data = await res.json();
                if (data.recent_events) {
                    setEvents(data.recent_events.map((e: any) => ({
                        ...e,
                        icon: e.type === 'click' ? Activity : Zap // Map string type to Icon component
                    })));
                }
            } catch (error) {
                console.error("Failed to fetch activity feed", error);
            }
        };

        fetchEvents();

        // Poll every 5 seconds
        const interval = setInterval(fetchEvents, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <Card className="glass-panel p-6 border-white/5 bg-[#0B0F17]/50 relative overflow-hidden h-full flex flex-col">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-blue-400" />
                Live Activity
                <span className="relative flex h-2 w-2 ml-auto">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
            </h3>

            <div className="flex-1 space-y-4 overflow-hidden relative">
                <AnimatePresence initial={false} mode="popLayout">
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            layout
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                        >
                            <div className={`mt-0.5 ${event.color}`}>
                                {event.icon && <event.icon className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-300">{event.text}</p>
                                <p className="text-[10px] text-gray-500 mt-1">{formatTime(event.time)}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Fade Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0B0F17] to-transparent pointer-events-none" />
            </div>
        </Card>
    )
}

function formatTime(isoString: string) {
    if (!isoString) return "Just now";
    const date = new Date(isoString);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // seconds

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
}
