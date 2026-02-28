"use client"

import { useState } from "react"
import { MountainLogo } from "@/components/icons"
import { Eye, EyeOff, ArrowRight, Mountain } from "lucide-react"

interface SignInPageProps {
  onSignIn: () => void
}

export function SignInPage({ onSignIn }: SignInPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }
    setIsLoading(true)
    setError("")
    setTimeout(() => {
      setIsLoading(false)
      onSignIn()
    }, 800)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Decorative mountain range at bottom */}
      <svg
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 right-0 w-full pointer-events-none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 320 L120 240 L200 280 L360 160 L480 220 L600 120 L720 200 L840 80 L960 180 L1080 100 L1200 200 L1320 140 L1440 220 L1440 320 Z"
          className="fill-primary/5"
        />
        <path
          d="M0 320 L180 260 L300 300 L480 200 L600 260 L720 180 L900 240 L1080 160 L1200 240 L1440 200 L1440 320 Z"
          className="fill-primary/[0.08]"
        />
        <path
          d="M0 320 L240 280 L420 310 L600 260 L780 300 L960 250 L1140 290 L1320 260 L1440 280 L1440 320 Z"
          className="fill-primary/[0.03]"
        />
      </svg>

      {/* Scattered dots pattern */}
      <div className="absolute top-12 right-12 grid grid-cols-4 gap-3 opacity-[0.06]" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="size-2 rounded-full bg-foreground" />
        ))}
      </div>
      <div className="absolute bottom-40 left-12 grid grid-cols-3 gap-3 opacity-[0.06]" aria-hidden="true">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="size-2 rounded-full bg-foreground" />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-sm">
        {/* Logo + Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-primary mb-6 shadow-[4px_4px_0px_0px] shadow-summit-dark">
            <Mountain className="size-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Summit
          </h1>
          <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
            Build the foundation, reach the summit.
          </p>
        </div>

        {/* Sign in card */}
        <div className="rounded-xl border-2 border-border bg-card p-6 shadow-[6px_6px_0px_0px] shadow-border/50">
          <h2 className="text-lg font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Continue your learning journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-mono font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 px-3.5 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-mono font-bold text-muted-foreground mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 px-3.5 pr-11 rounded-lg border-2 border-border bg-background text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive font-medium" role="alert">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[3px_3px_0px_0px] hover:shadow-summit-dark active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <div className="size-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Start Climbing
                  <ArrowRight className="size-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <button
            onClick={onSignIn}
            className="mt-4 w-full h-11 rounded-lg border-2 border-border bg-background text-foreground font-bold text-sm hover:border-primary hover:bg-secondary transition-all"
          >
            Explore as Guest
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {"Don't have an account? "}
          <button onClick={onSignIn} className="text-primary font-bold hover:underline">
            Create one
          </button>
        </p>

        {/* Decorative trail markers */}
        <div className="mt-10 flex items-center justify-center gap-8 text-muted-foreground/30">
          <div className="flex flex-col items-center gap-1">
            <div className="size-1.5 rounded-full bg-current" />
            <div className="w-px h-3 bg-current" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="size-2 rounded-full bg-current" />
            <div className="w-px h-4 bg-current" />
          </div>
          <MountainLogo className="size-5 opacity-30" />
          <div className="flex flex-col items-center gap-1">
            <div className="size-2 rounded-full bg-current" />
            <div className="w-px h-4 bg-current" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="size-1.5 rounded-full bg-current" />
            <div className="w-px h-3 bg-current" />
          </div>
        </div>
      </div>
    </div>
  )
}
