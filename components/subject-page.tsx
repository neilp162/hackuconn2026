"use client"

import { useState } from "react"
import { ArrowLeft, Check, Lock, Play, ArrowRight, Mountain, ChevronDown } from "lucide-react"
import { MountainLogo, SubjectIcon } from "@/components/icons"
import { MasteryRing } from "@/components/mastery-ring"
import { lessonTrees, subjects, type LessonNode } from "@/lib/store"

interface SubjectPageProps {
  subjectId: string
  onBack: () => void
  onLessonClick: (nodeId: string) => void
}

export function SubjectPage({ subjectId, onBack, onLessonClick }: SubjectPageProps) {
  const lessons = lessonTrees[subjectId] || []
  const subject = subjects.find(s => s.id === subjectId)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [nodes, setNodes] = useState<LessonNode[]>(lessons)

  const completedCount = nodes.filter(n => n.status === "completed").length
  const progress = nodes.length > 0 ? Math.round((completedCount / nodes.length) * 100) : 0

  const handleLessonClick = (node: LessonNode) => {
    if (node.status === "locked") return
    onLessonClick(node.id)
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <MountainLogo className="size-6" />
              <div>
                <h1 className="font-bold text-foreground text-sm leading-tight">{subject?.title || "Subject"}</h1>
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">Lesson Map</p>
              </div>
            </div>
          </div>
          <MasteryRing progress={progress} size={38} strokeWidth={3}>
            <span className="text-[10px] font-bold text-foreground">{progress}%</span>
          </MasteryRing>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-muted">
          <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </header>

      <main className="max-w-lg mx-auto px-6 py-10">
        {/* Subject header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-12 rounded-xl bg-secondary mb-3">
            <SubjectIcon type={subject?.icon || "integral"} className="size-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground tracking-tight">{subject?.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">{subject?.description}</p>
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-muted-foreground font-mono">
            <span>{nodes.length} lessons</span>
            <span className="text-border">|</span>
            <span>{completedCount} completed</span>
          </div>
        </div>

        {/* Linear lesson tree */}
        <div className="relative">
          {/* Vertical trail line */}
          <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />

          <div className="relative space-y-0">
            {nodes.map((node, index) => {
              const isHovered = hoveredNode === node.id
              const isClickable = node.status !== "locked"
              const isFirst = index === 0
              const isLast = index === nodes.length - 1

              return (
                <div key={node.id} className="relative">
                  {/* Connector */}
                  {index > 0 && (
                    <div className="flex justify-center py-1.5 pl-6 sm:pl-0" aria-hidden="true">
                      <ChevronDown className={`size-3.5 ${
                        node.status === "completed" || node.status === "available" || node.status === "in-progress"
                          ? "text-primary"
                          : "text-border"
                      }`} />
                    </div>
                  )}

                  {/* Altitude label */}
                  {isFirst && (
                    <div className="flex justify-center mb-2">
                      <span className="text-[9px] font-mono text-muted-foreground/40 uppercase tracking-widest">Base Camp</span>
                    </div>
                  )}

                  {/* Node card */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleLessonClick(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      disabled={node.status === "locked"}
                      className={`relative w-full max-w-sm p-4 rounded-xl border-2 transition-all text-left ${
                        node.status === "completed"
                          ? "border-primary/40 bg-secondary"
                          : node.status === "available" || node.status === "in-progress"
                          ? "border-primary bg-card shadow-[4px_4px_0px_0px] shadow-primary/15 hover:shadow-[6px_6px_0px_0px] hover:shadow-primary/20 cursor-pointer"
                          : "border-border bg-muted/30 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Node marker */}
                        <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${
                          node.status === "completed"
                            ? "bg-primary text-primary-foreground"
                            : node.status === "available" || node.status === "in-progress"
                            ? "bg-primary/10"
                            : "bg-muted"
                        }`}>
                          {node.status === "completed" ? (
                            <Check className="size-4" />
                          ) : node.status === "available" || node.status === "in-progress" ? (
                            <Play className="size-3.5 text-primary" />
                          ) : (
                            <Lock className="size-3.5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-muted-foreground/50">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className={`font-bold text-sm ${
                              node.status === "locked" ? "text-muted-foreground" : "text-foreground"
                            }`}>
                              {node.title}
                            </h3>
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 pl-7">{node.description}</p>
                        </div>

                        {isClickable && node.status !== "completed" && (
                          <ArrowRight className={`size-4 text-primary shrink-0 transition-transform ${isHovered ? "translate-x-0.5" : ""}`} />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Summit flag */}
                  {isLast && (
                    <div className="flex justify-center mt-3">
                      <div className="flex items-center gap-1.5 text-primary/30">
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

        {/* Legend */}
        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {[
            { label: "Completed", icon: <Check className="size-3" />, style: "bg-primary text-primary-foreground" },
            { label: "Available", icon: <Play className="size-3" />, style: "bg-primary/10 text-primary" },
            { label: "Locked", icon: <Lock className="size-3" />, style: "bg-muted text-muted-foreground" },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className={`size-5 rounded flex items-center justify-center ${item.style}`}>
                {item.icon}
              </div>
              {item.label}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
