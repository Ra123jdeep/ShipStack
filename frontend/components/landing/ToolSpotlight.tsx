"use client"

import { motion } from "framer-motion"
import { Database, Image as ImageIcon, Zap } from "lucide-react"

export function ToolSpotlight() {
    return (
        <section className="py-24 px-4 bg-gradient-to-b from-[#0B0F17] to-black">
            <div className="container max-w-7xl mx-auto">
                <div className="glass-panel border-white/10 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center">

                    {/* Background Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/20 blur-[120px] rounded-full mix-blend-screen opacity-40" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                        <div className="w-20 h-20 mx-auto bg-black border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                            <Database className="w-10 h-10 text-green-400" />
                        </div>

                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                            Powering the Next Generation <br />
                            with <span className="text-green-400">Supabase</span>
                        </h2>

                        <p className="text-xl text-gray-400 leading-relaxed">
                            The open source Firebase alternative. Instantly scalable database, authentication, real-time subscriptions, and storage. Pre-integrated into ShipStack blueprints.
                        </p>

                        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-white/5 mt-12">
                            <div className="space-y-2">
                                <div className="text-white font-bold text-lg flex justify-center"><Zap className="w-5 h-5 mr-2 text-yellow-400" /> Fast</div>
                                <p className="text-sm text-gray-500">Real-time updates</p>
                            </div>
                            <div className="space-y-2">
                                <div className="text-white font-bold text-lg flex justify-center"><Database className="w-5 h-5 mr-2 text-blue-400" /> SQL</div>
                                <p className="text-sm text-gray-500">Full Postgres Power</p>
                            </div>
                            <div className="space-y-2">
                                <div className="text-white font-bold text-lg flex justify-center"><ImageIcon className="w-5 h-5 mr-2 text-pink-400" /> Assets</div>
                                <p className="text-sm text-gray-500">Integrated Storage</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
