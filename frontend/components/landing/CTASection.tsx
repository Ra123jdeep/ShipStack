"use client"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
    return (
        <section className="py-32 px-4 text-center">
            <div className="container max-w-4xl mx-auto">
                <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
                    Ready to <span className="text-blue-500">Ship?</span>
                </h2>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                    Join thousands of developers building the future with ShipStack. The operating system for your next big idea.
                </p>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href="/stack-generator">
                        <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-white text-black hover:bg-gray-200">
                            <Sparkles className="w-5 h-5 mr-2" /> Start Generating
                        </Button>
                    </Link>
                    <Link href="/tools">
                        <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-white/10 text-white hover:bg-white/5">
                            Browse Tools
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
