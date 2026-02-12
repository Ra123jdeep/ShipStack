"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, User, Loader2, ArrowRight, Zap, Sparkles, Send, Settings2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { StackVisualizer } from "./StackVisualizer"

interface Message {
    role: "user" | "assistant"
    content: string
    stack?: any
}

export function StackGenerator() {
    const searchParams = useSearchParams()
    const initialQuery = searchParams.get("query")
    const initialProfile = searchParams.get("profile") || "Indie Hacker"

    const [input, setInput] = useState("")
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm your AI Stack Architect. Describe your project (e.g., 'A real-time chat app for students'), and I'll build the perfect tech stack for you." }
    ])
    const [loading, setLoading] = useState(false)
    const [currentStack, setCurrentStack] = useState<any>(null)
    const hasInitialized = useRef(false)
    const chatContainerRef = useRef<HTMLDivElement>(null)

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth"
            })
        }
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, loading])

    useEffect(() => {
        if (initialQuery && !hasInitialized.current) {
            hasInitialized.current = true
            handleAutoSubmit(initialQuery, initialProfile)
        }
    }, [initialQuery, initialProfile])

    const handleAutoSubmit = async (query: string, profile: string = "Indie Hacker") => {
        const userMsg = { role: "user" as const, content: query }
        setMessages(prev => [...prev, userMsg])
        setLoading(true)
        setCurrentStack(null) // Reset while loading

        try {
            const response = await fetch("http://localhost:8000/api/v1/stacks/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ description: query, user_profile: profile }),
            })

            if (!response.ok) throw new Error("Failed to generate stack")

            const data = await response.json()
            const stackData = {
                name: data.name,
                reasoning: data.generated_reasoning,
                components: data.components,
                description: data.description,
                user_type: data.user_type,
                trust_score: data.trust_score
            }

            setCurrentStack(stackData)

            const aiMsg = {
                role: "assistant" as const,
                content: "Here is the recommended stack for your project based on your requirements.",
                stack: stackData
            }
            setMessages(prev => [...prev, aiMsg])
        } catch (error) {
            console.error(error)
            setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }])
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!input.trim()) return
        const query = input
        setInput("")
        await handleAutoSubmit(query, "Indie Hacker")
    }

    return (
        <div className="flex flex-col lg:flex-row h-[calc(100vh-220px)] min-h-[500px] w-full max-w-7xl mx-auto border border-white/10 rounded-2xl overflow-hidden bg-[#030711]/50 backdrop-blur-xl shadow-2xl">
            {/* Left Panel: Chat Interface */}
            <div className="flex flex-col w-full lg:w-[400px] border-r border-white/10 bg-black/20">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-blue-400" />
                        </div>
                        <span className="font-semibold text-white">AI Architect</span>
                    </div>
                </div>

                <div
                    ref={chatContainerRef}
                    className="flex-1 overflow-y-auto p-3 space-y-4 no-scrollbar"
                >
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === "user" ? "bg-blue-600 text-white" : "bg-white/10 text-gray-300"}`}>
                                {msg.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                            </div>

                            <div className={`max-w-[85%] space-y-1`}>
                                <div className={`p-3 rounded-2xl text-sm leading-relaxed ${msg.role === "user"
                                    ? "bg-blue-600 text-white rounded-tr-sm"
                                    : "bg-white/5 text-gray-300 border border-white/5 rounded-tl-sm"
                                    }`}>
                                    {msg.content}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {loading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                <Bot className="h-4 w-4 text-gray-300" />
                            </div>
                            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-sm border border-white/5 flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                                <span className="text-xs text-gray-400">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t border-white/10 bg-black/40">
                    <form onSubmit={handleSubmit} className="relative">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your app..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 placeholder:text-gray-600"
                            disabled={loading}
                        />
                        <button
                            type="submit"
                            disabled={loading || !input.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Panel: Visualization */}
            <div className="flex-1 overflow-hidden relative bg-grid-white/[0.02] bg-[size:40px_40px]">
                {/* Controls Overlay */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                    <Button variant="ghost" size="sm" className="h-8 bg-black/40 border border-white/10 text-gray-400 hover:text-white backdrop-blur-md">
                        <Settings2 className="h-3.5 w-3.5 mr-2" />
                        Optimize
                    </Button>
                </div>

                <div className="h-full w-full">
                    <StackVisualizer stack={currentStack} loading={loading} />
                </div>
            </div>
        </div>
    )
}
