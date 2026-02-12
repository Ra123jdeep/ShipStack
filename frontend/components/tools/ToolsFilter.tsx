"use client"

import { Button } from "@/components/ui/button"

const categories = ["All", "Frontend Frameworks", "UI Kits", "Deployment Tools", "AI/ML", "APIs & Services", "Databases", "Auth", "Monetization", "Automation", "Analytics", "Communication"]

interface ToolsFilterProps {
    selectedCategory: string
    onSelectCategory: (category: string) => void
    orientation?: "horizontal" | "vertical"
}

export function ToolsFilter({ selectedCategory, onSelectCategory, orientation = "horizontal" }: ToolsFilterProps) {
    const isVertical = orientation === "vertical"

    return (
        <div className={`w-full ${isVertical ? '' : 'overflow-x-auto pb-4 no-scrollbar'}`}>
            <div className={`flex ${isVertical ? 'flex-col items-stretch' : 'min-w-max'} gap-2`}>
                <Button
                    variant={selectedCategory === "All" ? "default" : "ghost"}
                    className={`${isVertical ? 'justify-start' : ''} ${selectedCategory === "All" ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
                    onClick={() => onSelectCategory("All")}
                >
                    All
                </Button>
                {categories.slice(1).map((cat) => (
                    <Button
                        key={cat}
                        variant={selectedCategory === cat ? "default" : "ghost"}
                        className={`${isVertical ? 'justify-start' : ''} ${selectedCategory === cat ? "bg-slate-900 text-white hover:bg-slate-800" : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"}`}
                        onClick={() => onSelectCategory(cat)}
                    >
                        {cat}
                    </Button>
                ))}
            </div>
        </div>
    )
}
