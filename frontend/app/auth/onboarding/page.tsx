"use client"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { User, Loader2, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function OnboardingPage() {
    const [fullName, setFullName] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { updateProfile } = useAuth()
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!fullName) return

        setIsSubmitting(true)
        try {
            await updateProfile({ full_name: fullName })
            router.push("/")
        } catch (error) {
            console.error(error)
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
                        <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <User className="w-5 h-5 text-purple-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">One last thing</h1>
                    <p className="text-gray-400">What should we call you?</p>
                </div>

                <Card className="glass-panel p-8 border-white/5 bg-[#0B0F17]/50 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="e.g. Elon Musk"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus:border-purple-500/50 h-12"
                                autoFocus
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-purple-600 hover:bg-purple-500 text-white font-medium"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </Card>
            </motion.div>
        </div>
    )
}
