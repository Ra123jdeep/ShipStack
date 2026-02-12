"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/context/AuthContext"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ShieldCheck, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

export default function VerifyPage() {
    const [code, setCode] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { verifyOTP } = useAuth()
    const searchParams = useSearchParams()
    const email = searchParams.get("email")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!code || !email) return

        setIsSubmitting(true)
        try {
            await verifyOTP(email, code)
            // Redirect handled in verifyOTP
        } catch (error) {
            console.error(error)
            // TODO: Show toast error
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!email) return null

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
                        <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center border border-green-500/20">
                            <ShieldCheck className="w-5 h-5 text-green-400" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Check your inbox</h1>
                    <p className="text-gray-400">We've sent a 6-digit code to <span className="text-white">{email}</span>.</p>
                </div>

                <Card className="glass-panel p-8 border-white/5 bg-[#0B0F17]/50 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="code" className="text-sm font-medium text-gray-300">Enter Verification Code</label>
                            <Input
                                id="code"
                                type="text"
                                placeholder="123456"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="bg-black/20 border-white/10 text-white placeholder:text-gray-600 focus:border-green-500/50 h-14 text-center text-2xl tracking-widest font-mono"
                                maxLength={6}
                                autoFocus
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-12 bg-green-600 hover:bg-green-500 text-white font-medium"
                            disabled={isSubmitting || code.length < 6}
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                "Verify & Continue"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        Didn't receive code? <button className="text-blue-400 hover:text-blue-300 underline">Resend</button>
                    </div>
                </Card>
            </motion.div>
        </div>
    )
}
