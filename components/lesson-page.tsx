"use client"

import { useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  Mountain,
  ChevronRight,
  Lightbulb,
} from "lucide-react"
import { MountainLogo } from "@/components/icons"
import { MasteryRing } from "@/components/mastery-ring"
import { AreaUnderCurveVisualization, RiemannSumVisualization } from "@/components/visualizations"
import { integrationReviewLesson, type QuizQuestion } from "@/lib/store"

interface LessonPageProps {
  nodeId: string
  onBack: () => void
  onComplete: () => void
}

function QuizSection({
  questions,
  onAllCorrect,
}: {
  questions: QuizQuestion[]
  onAllCorrect: () => void
}) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const question = questions[currentQ]
  const isCorrect = selectedAnswer === question.correctIndex
  const isLastQuestion = currentQ === questions.length - 1

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return
    setSelectedAnswer(index)
    setShowExplanation(true)
    if (index === question.correctIndex) {
      setCorrectCount((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (isLastQuestion) {
      onAllCorrect()
      return
    }
    setCurrentQ((q) => q + 1)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setShowHint(false)
  }

  const hints = [
    "Think about what the integration rules tell us.",
    "Try applying the power rule: increase exponent by 1, divide by new exponent.",
    "Remember that integration reverses differentiation.",
  ]
  const [hintLevel, setHintLevel] = useState(0)

  const showNextHint = () => {
    if (hintLevel < hints.length) {
      setHintLevel((h) => h + 1)
      setShowHint(true)
    }
  }

  return (
    <div className="rounded-xl border-2 border-border bg-card overflow-hidden">
      {/* Quiz header */}
      <div className="px-5 py-3 bg-muted/50 border-b-2 border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono text-muted-foreground">
            QUESTION {currentQ + 1} OF {questions.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`size-2 rounded-full transition-colors ${
                i < currentQ
                  ? "bg-primary"
                  : i === currentQ
                  ? "bg-primary/50"
                  : "bg-border"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold text-foreground mb-5 leading-relaxed">{question.question}</h3>

        <div className="space-y-2.5">
          {question.options.map((option, i) => {
            let optionStyle = "border-border bg-background hover:border-primary/40 hover:bg-secondary/50"
            if (selectedAnswer !== null) {
              if (i === question.correctIndex) {
                optionStyle = "border-primary bg-secondary"
              } else if (i === selectedAnswer && !isCorrect) {
                optionStyle = "border-destructive bg-destructive/5"
              } else {
                optionStyle = "border-border bg-background opacity-40"
              }
            }

            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3 ${optionStyle}`}
              >
                <span className="size-7 rounded-lg border-2 border-border flex items-center justify-center text-xs font-mono font-bold shrink-0">
                  {selectedAnswer !== null && i === question.correctIndex ? (
                    <Check className="size-3.5 text-primary" />
                  ) : selectedAnswer === i && !isCorrect ? (
                    <X className="size-3.5 text-destructive" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span className="text-sm text-foreground">{option}</span>
              </button>
            )
          })}
        </div>

        {/* Hint ladder */}
        {selectedAnswer === null && (
          <div className="mt-4">
            <button
              onClick={showNextHint}
              className="flex items-center gap-2 text-xs text-primary hover:underline font-medium"
            >
              <Lightbulb className="size-3.5" />
              {hintLevel === 0 ? "Need a hint?" : `Another hint (${hintLevel}/${hints.length})`}
            </button>
            {showHint && hintLevel > 0 && (
              <div className="mt-2 space-y-1.5">
                {hints.slice(0, hintLevel).map((hint, i) => (
                  <div key={i} className="px-3 py-2 rounded-lg bg-secondary text-xs text-secondary-foreground border border-border">
                    <span className="font-mono text-[10px] text-primary mr-1.5 font-bold">HINT {i + 1}:</span>
                    {hint}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div
            className={`mt-5 p-4 rounded-xl border-2 ${
              isCorrect
                ? "border-primary/50 bg-secondary"
                : "border-destructive/30 bg-destructive/5"
            }`}
          >
            <p className="text-sm font-bold mb-1 flex items-center gap-2">
              {isCorrect ? (
                <>
                  <Check className="size-3.5 text-primary" />
                  <span className="text-primary">Correct!</span>
                </>
              ) : (
                <>
                  <X className="size-3.5 text-destructive" />
                  <span className="text-destructive">Not quite.</span>
                </>
              )}
            </p>
            <p className="text-xs text-foreground/80 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {/* Next */}
        {selectedAnswer !== null && (
          <button
            onClick={handleNext}
            className="mt-5 w-full h-10 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[3px_3px_0px_0px] hover:shadow-summit-dark active:shadow-none transition-all"
          >
            {isLastQuestion ? "Continue" : "Next Question"}
            <ArrowRight className="size-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

export function LessonPage({ nodeId, onBack, onComplete }: LessonPageProps) {
  const lesson = integrationReviewLesson
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [sectionsCompleted, setSectionsCompleted] = useState<number[]>([])
  const totalSections = lesson.sections.length

  const currentSection = lesson.sections[currentSectionIndex]
  const progress = Math.round(((currentSectionIndex + 1) / totalSections) * 100)

  const goToNextSection = () => {
    setSectionsCompleted((prev) => [...prev, currentSectionIndex])
    if (currentSectionIndex < totalSections - 1) {
      setCurrentSectionIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      onComplete()
    }
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b-2 border-border">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Back to lesson map"
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex items-center gap-2.5">
              <MountainLogo className="size-6" />
              <div>
                <h1 className="font-bold text-foreground text-sm leading-tight">{lesson.title}</h1>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono uppercase">
                  <span>Section {currentSectionIndex + 1}/{totalSections}</span>
                </div>
              </div>
            </div>
          </div>
          <MasteryRing progress={progress} size={36} strokeWidth={3}>
            <span className="text-[9px] font-bold text-foreground">{progress}%</span>
          </MasteryRing>
        </div>
        <div className="h-0.5 bg-muted">
          <div className="h-full bg-primary transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-3xl mx-auto px-6 pt-5">
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
          <span>Calculus 2</span>
          <ChevronRight className="size-2.5" />
          <span>{lesson.title}</span>
          <ChevronRight className="size-2.5" />
          <span className="text-foreground">Section {currentSectionIndex + 1}</span>
        </div>
      </div>

      {/* Section tabs */}
      <div className="max-w-3xl mx-auto px-6 pt-4">
        <div className="flex items-center justify-center gap-1.5">
          {lesson.sections.map((section, i) => (
            <button
              key={i}
              onClick={() => {
                if (sectionsCompleted.includes(i) || i <= currentSectionIndex) {
                  setCurrentSectionIndex(i)
                }
              }}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition-colors ${
                i === currentSectionIndex
                  ? "bg-primary text-primary-foreground"
                  : sectionsCompleted.includes(i)
                  ? "bg-secondary text-primary"
                  : "bg-muted text-muted-foreground"
              }`}
              aria-label={`Section ${i + 1}: ${section.type}`}
            >
              {section.type === "content" && "READ"}
              {section.type === "visualization" && "EXPLORE"}
              {section.type === "quiz" && "QUIZ"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {currentSection.type === "content" && (
          <div className="space-y-6">
            <div className="space-y-4">
              {currentSection.content?.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-foreground/85 leading-relaxed text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>
            <button
              onClick={goToNextSection}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[3px_3px_0px_0px] hover:shadow-summit-dark active:shadow-none transition-all"
            >
              Continue
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}

        {currentSection.type === "visualization" && (
          <div className="space-y-6">
            {currentSection.visualizationType === "area-under-curve" && (
              <AreaUnderCurveVisualization />
            )}
            {currentSection.visualizationType === "riemann-sum" && (
              <RiemannSumVisualization />
            )}
            <button
              onClick={goToNextSection}
              className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-bold text-sm flex items-center justify-center gap-2 hover:shadow-[3px_3px_0px_0px] hover:shadow-summit-dark active:shadow-none transition-all"
            >
              Continue to Quiz
              <ArrowRight className="size-4" />
            </button>
          </div>
        )}

        {currentSection.type === "quiz" && currentSection.questions && (
          <QuizSection
            questions={currentSection.questions}
            onAllCorrect={goToNextSection}
          />
        )}
      </main>

      {/* Altitude indicator */}
      <div className="fixed bottom-6 right-6 hidden lg:flex flex-col items-center gap-1">
        <Mountain className="size-3.5 text-primary/30" />
        <div className="w-0.5 h-16 rounded-full bg-muted overflow-hidden">
          <div
            className="w-full bg-primary transition-all duration-500 rounded-full"
            style={{ height: `${progress}%`, marginTop: `${100 - progress}%` }}
          />
        </div>
        <span className="text-[9px] font-mono text-muted-foreground/40">ALT</span>
      </div>
    </div>
  )
}
