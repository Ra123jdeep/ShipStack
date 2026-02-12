"use client"
import { Suspense } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { StackGenerator } from "@/components/stack/StackGenerator"
import { motion } from "framer-motion"

export default function StackGeneratorPage() {
    return (
        <main className="min-h-screen bg-background relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
            <Navbar />
            <div className="container px-4 md:px-8 py-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-6 max-w-2xl"
                >
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">AI Stack Architect</h1>
                    <p className="text-muted-foreground text-sm md:text-base">
                        Describe your project, and our AI will assemble the perfect production-ready tech stack for you in seconds.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full"
                >
                    <Suspense fallback={<div className="text-center text-muted-foreground">Loading Architect...</div>}>
                        <StackGenerator />
                    </Suspense>
                </motion.div>
            </div>
        </main>
    )
}
