"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/layout/Navbar"
import { HeroSection } from "@/components/landing/HeroSection"
import { FeaturedStack } from "@/components/landing/FeaturedStack"
import { InsightsStrip } from "@/components/landing/InsightsStrip"
import { StackGeneratorPreview } from "@/components/landing/StackGeneratorPreview"
import { FeaturesGrid } from "@/components/landing/FeaturesGrid"
import { ToolSpotlight } from "@/components/landing/ToolSpotlight"
import { BuilderPaths } from "@/components/landing/BuilderPaths"
import { CTASection } from "@/components/landing/CTASection"
import { ToolCard } from "@/components/tools/ToolCard"
import { CompatibilityGraph } from "@/components/insights/CompatibilityGraph"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const [tools, setTools] = useState<any[]>([])

  // Fetch tools for the Curated Grid
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch("/api/tools/")
        if (response.ok) {
          const data = await response.json()
          setTools(data)
        }
      } catch (error) {
        console.error("Failed to fetch tools:", error)
      }
    }
    fetchTools()
  }, [])

  // Exact 15 tools for the "Curated Grid"
  const gridTools = tools.slice(0, 15)

  return (
    <main className="min-h-screen cosmic-bg font-sans text-foreground selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Featured Stack */}
      <FeaturedStack />

      {/* 3. Insights Strip */}
      <InsightsStrip />

      {/* 4. Stack Generator Preview */}
      <StackGeneratorPreview />

      {/* 5. Features Grid */}
      <FeaturesGrid />

      {/* 5. Tool Spotlight */}
      <ToolSpotlight />

      {/* 6. Curated Tools Grid */}
      <section className="py-24 px-4 bg-[#0B0F17]">
        <div className="container max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white">Curated Collection</h2>
              <p className="text-gray-400 mt-2">The top 15 essential tools for modern web development.</p>
            </div>
            <Link href="/tools/all">
              <Button variant="outline" className="border-white/10 text-white hover:bg-white/5">View Full Archive</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {gridTools.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="h-full"
              >
                <ToolCard {...tool} trust_score={90 + (i % 9)} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Builder Paths */}
      <BuilderPaths />

      {/* 8. Compatibility Graph */}
      <section className="py-24 px-4 border-t border-white/5 bg-black/40">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Ecosystem Compatibility</h2>
            <p className="text-gray-400 mt-2">Visualize how your favorite tools connect and integrate.</p>
          </div>
          <div className="h-[500px] border border-white/10 rounded-3xl overflow-hidden bg-[#050505]">
            <CompatibilityGraph />
          </div>
        </div>
      </section>

      {/* 9. Final CTA */}
      <CTASection />

    </main>
  )
}
