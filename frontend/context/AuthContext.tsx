"use client"

import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
    id: string
    email: string
    full_name?: string
    avatar_url?: string
    is_active: boolean
    created_at: string
}

interface AuthContextType {
    user: User | null
    isLoading: boolean
    login: (email: string) => Promise<void>
    verifyOTP: (email: string, code: string) => Promise<void>
    logout: () => void
    updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("access_token")
            if (token) {
                try {
                    const res = await fetch("/api/auth/users/me", {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    if (res.ok) {
                        const userData = await res.json()
                        setUser(userData)
                    } else {
                        localStorage.removeItem("access_token")
                    }
                } catch (error) {
                    localStorage.removeItem("access_token")
                }
            }
            setIsLoading(false)
        }
        checkAuth()
    }, [])

    const login = async (email: string) => {
        const res = await fetch("/api/auth/request-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        })
        if (!res.ok) throw new Error("Failed to send OTP")
    }

    const verifyOTP = async (email: string, code: string) => {
        const res = await fetch("/api/auth/verify-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, code })
        })

        if (!res.ok) throw new Error("Invalid OTP")

        const data = await res.json()
        localStorage.setItem("access_token", data.access_token)

        // Fetch user immediately
        const userRes = await fetch("/api/auth/users/me", {
            headers: { Authorization: `Bearer ${data.access_token}` }
        })

        if (userRes.ok) {
            const userData = await userRes.json()
            setUser(userData)

            // Redirect based on profile completion
            if (!userData.full_name) {
                router.push("/auth/onboarding")
            } else {
                router.push("/")
            }
        }
    }

    const logout = () => {
        localStorage.removeItem("access_token")
        setUser(null)
        router.push("/auth/login")
    }

    const updateProfile = async (data: { full_name?: string; avatar_url?: string }) => {
        const token = localStorage.getItem("access_token")
        if (!token) return

        const res = await fetch("/api/auth/users/me", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })

        if (res.ok) {
            const updatedUser = await res.json()
            setUser(updatedUser)
        }
    }

    return (
        <AuthContext.Provider value={{ user, isLoading, login, verifyOTP, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
