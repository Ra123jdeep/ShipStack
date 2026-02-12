"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Sparkles, ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { login } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setIsSubmitting(true)
        try {
            await login(email)
            router.push(`/auth/verify?email=${encodeURIComponent(email)}`)
        } catch (error) {
            console.error(error)
            // TODO: Show toast error
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen cosmic-bg flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                            <Sparkles className="w-5 h-5 text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-400">Enter your email to sign in to your workspace.</p>
                </div>

                <Card className="glass-panel p-8 border-white/5 bg-[#0B0F17]/50 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus:border-blue-500/50 h-12"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-blue-600 hover:bg-blue-500 text-white font-medium"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    Continue <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
