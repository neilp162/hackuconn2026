"use client"

import { useState } from "react"
import { ArrowLeft, Check, Lock, ArrowRight, Mountain, ChevronDown } from "lucide-react"
import { MountainLogo, SubjectIcon } from "@/components/icons"
import { prereqChains, subjects, type PrereqNode } from "@/lib/store"

interface PrereqTreePageProps {
  subjectId: string
  onBack: () => void
  onSubjectSelect: (subjectId: string) => void
}

export function PrereqTreePage({ subjectId, onBack, onSubjectSelect }: PrereqTreePageProps) {
  const chain = prereqChains[subjectId] || []
  const subject = subjects.find(s => s.id === subjectId)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const completedCount = chain.filter(n => n.status === "completed").length
  const totalCount = chain.length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <MountainLogo className="size-6" />
              <div>
                <h1 className="font-bold text-foreground text-sm leading-tight">{subject?.title || "Subject"}</h1>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Prerequisite Path</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-secondary text-xs font-mono text-secondary-foreground">
            <Mountain className="size-3.5" />
            <span>{completedCount}/{totalCount}</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-10">
        {/* Summit target label */}
        <div className="text-center mb-8">
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-2">Your Path To</p>
          <h2 className="text-xl font-bold text-foreground tracking-tight">{subject?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{subject?.description}</p>
        </div>

        {/* Linear prereq chain - bottom to top visually */}
        <div className="relative">
          {/* Vertical connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-border" aria-hidden="true" />

          <div className="relative space-y-0">
            {chain.map((node, index) => {
              const isLast = index === chain.length - 1
              const isHovered = hoveredNode === node.id
              const isTarget = node.id === subjectId

              return (
                <div key={node.id} className="relative">
                  {/* Connector arrow between nodes */}
                  {index > 0 && (
                    <div className="flex justify-center py-2" aria-hidden="true">
                      <div className={`flex flex-col items-center ${node.status === "completed" || node.status === "available" ? "text-primary" : "text-border"}`}>
                        <ChevronDown className="size-4" />
                      </div>
                    </div>
                  )}

                  {/* Node */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        if (isTarget) {
                          onSubjectSelect(subjectId)
                        }
                      }}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      disabled={node.status === "locked"}
                      className={`relative w-full max-w-sm p-4 rounded-xl border-2 transition-all ${
                        isTarget && node.status === "available"
                          ? "border-primary bg-card shadow-[4px_4px_0px_0px] shadow-primary/20 hover:shadow-[6px_6px_0px_0px] hover:shadow-primary/25 cursor-pointer"
                          : node.status === "completed"
                          ? "border-primary/40 bg-secondary"
                          : "border-border bg-card"
                      }`}
                    >
                      {/* Altitude marker */}
                      <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5">
                        <span className="text-[10px] font-mono text-muted-foreground/50">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Status icon */}
                        <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${
                          node.status === "completed"
                            ? "bg-primary/10"
                            : node.status === "available"
                            ? "bg-primary/5"
                            : "bg-muted"
                        }`}>
                          {node.status === "completed" ? (
                            <Check className="size-4 text-primary" />
                          ) : node.status === "available" ? (
                            <SubjectIcon type={subject?.icon || "integral"} className="size-4 text-primary" />
                          ) : (
                            <Lock className="size-3.5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0 text-left">
                          <div className="flex items-center gap-2">
                            <h3 className={`font-bold text-sm ${
                              node.status === "completed" ? "text-primary" : node.status === "available" ? "text-foreground" : "text-muted-foreground"
                            }`}>
                              {node.title}
                            </h3>
                            {isTarget && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-primary text-primary-foreground uppercase">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5">{node.description}</p>
                        </div>

                        {/* Action indicator for target */}
                        {isTarget && node.status === "available" && (
                          <ArrowRight className={`size-4 shrink-0 text-primary transition-transform ${isHovered ? "translate-x-0.5" : ""}`} />
                        )}

                        {/* Completed check */}
                        {node.status === "completed" && !isTarget && (
                          <span className="text-[10px] font-mono text-primary/60 shrink-0">DONE</span>
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Summit flag on last node */}
                  {isLast && isTarget && (
                    <div className="flex justify-center mt-3">
                      <div className="flex items-center gap-1.5 text-primary/40">
                        <Mountain className="size-3.5" />
                        <span className="text-[9px] font-mono uppercase tracking-widest">Summit</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Start button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => onSubjectSelect(subjectId)}
            className="h-11 px-8 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center gap-2 hover:shadow-[4px_4px_0px_0px] hover:shadow-summit-dark active:shadow-none active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            Start {subject?.title}
            <ArrowRight className="size-4" />
          </button>
        </div>
      </main>
    </div>
  )
}
