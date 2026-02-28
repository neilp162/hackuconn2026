"use client"

import { useState } from "react"
import { Search, ArrowRight, Mountain, TrendingUp, Sparkles, BookOpen } from "lucide-react"
import { MountainLogo, SubjectIcon } from "@/components/icons"
import { MasteryRing } from "@/components/mastery-ring"
import { subjects, suggestedTopics } from "@/lib/store"

interface DashboardPageProps {
  onSubjectClick: (subjectId: string) => void
  onSignOut: () => void
}

export function DashboardPage({ onSubjectClick, onSignOut }: DashboardPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchFocused, setSearchFocused] = useState(false)

  // Mock continuing subjects (first 2 with progress)
  const continuingSubjects = [
    { ...subjects[0], progress: 25, completedLessons: 3 },
    { ...subjects[3], progress: 10, completedLessons: 1 },
  ]

  // Group subjects by category
  const categories = ["Mathematics", "Sciences", "Computer Science", "Humanities"]
  const subjectsByCategory = categories.map(cat => ({
    name: cat,
    subjects: subjects.filter(s => s.category === cat),
  })).filter(c => c.subjects.length > 0)

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-border">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <MountainLogo className="size-7" />
            <span className="text-lg font-bold text-foreground tracking-tight">Summit</span>
          </div>
          <nav className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-secondary text-xs font-mono text-secondary-foreground">
              <Mountain className="size-3.5" />
              <span>Base Camp</span>
            </div>
            <button
              onClick={onSignOut}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Search section */}
        <section className="mb-10">
          <div className="flex items-start gap-3 mb-1.5">
            <Sparkles className="size-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                Start a new subject
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                Pick any topic and we will map the path from foundation to summit.
              </p>
            </div>
          </div>

          <div className="mt-5 relative">
            <div
              className={`flex items-center h-12 rounded-xl border-2 bg-card transition-all ${
                searchFocused ? "border-primary shadow-[3px_3px_0px_0px] shadow-primary/15" : "border-border"
              }`}
            >
              <Search className="size-4 text-muted-foreground ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="e.g. Stochastic Calculus, Neural Networks, Quantum Mechanics..."
                className="flex-1 h-full px-3 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
              />
              <button
                onClick={() => onSubjectClick("calculus-2")}
                className="h-8 px-4 mr-2 rounded-lg bg-primary text-primary-foreground font-bold text-xs flex items-center gap-1.5 hover:shadow-[2px_2px_0px_0px] hover:shadow-summit-dark active:shadow-none transition-all"
              >
                Explore
                <ArrowRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Suggested topics */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest mr-1">
              Try:
            </span>
            {suggestedTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSearchQuery(topic)}
                className="px-2.5 py-1 rounded-lg border-2 border-border bg-card text-xs text-foreground hover:border-primary hover:bg-secondary transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </section>

        {/* Continue Learning */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="size-4 text-primary" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Continue Climbing</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {continuingSubjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => onSubjectClick(subject.id)}
                className="group flex items-center gap-4 p-4 rounded-xl border-2 border-border bg-card hover:border-primary hover:shadow-[4px_4px_0px_0px] hover:shadow-primary/15 transition-all text-left"
              >
                <MasteryRing progress={subject.progress} size={48} strokeWidth={3.5}>
                  <SubjectIcon type={subject.icon} className="size-4 text-primary" />
                </MasteryRing>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                    {subject.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {subject.completedLessons} of {subject.totalLessons} lessons
                  </p>
                  <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </div>
                </div>
                <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </section>

        {/* Explore Subjects */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="size-4 text-red-500" />
            <h2 className="text-base font-bold text-foreground tracking-tight">Explore Subjects</h2>
          </div>

          <div className="space-y-6">
            {subjectsByCategory.map((category) => (
              <div key={category.name}>
                <h3 className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-widest mb-2.5">
                  {category.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.subjects.map((subject) => (
                    <button
                      key={subject.id}
                      onClick={() => onSubjectClick(subject.id)}
                      className="group flex items-start gap-3 p-4 rounded-xl border-2 border-border bg-card text-left hover:border-primary hover:shadow-[4px_4px_0px_0px] hover:shadow-primary/15 transition-all"
                    >
                      <div className="size-9 rounded-lg bg-red-200 flex items-center justify-center shrink-0 group-hover:bg-red-300 transition-colors">
                        <SubjectIcon type={subject.icon} className="size-4 text-black" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                          {subject.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {subject.description}
                        </p>
                        <span className="inline-block mt-2 text-[10px] font-mono text-muted-foreground/60">
                          {subject.totalLessons} LESSONS
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer tagline */}
        <footer className="mt-14 pb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-muted-foreground/20">
            <div className="w-8 h-px bg-current" />
            <Mountain className="size-4" />
            <div className="w-8 h-px bg-current" />
          </div>
          <p className="text-[10px] text-muted-foreground/50 font-mono tracking-[0.2em] uppercase">
            Build the foundation, reach the summit.
          </p>
        </footer>
      </main>
    </div>
  )
}
