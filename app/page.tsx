"use client"

import { useState } from "react"
import { SignInPage } from "@/components/sign-in-page"
import { DashboardPage } from "@/components/dashboard-page"
import { PrereqTreePage } from "@/components/prereq-tree-page"
import { SubjectPage } from "@/components/subject-page"
import { LessonPage } from "@/components/lesson-page"

type AppView = "sign-in" | "dashboard" | "prereq-tree" | "subject" | "lesson"

export default function Home() {
  const [view, setView] = useState<AppView>("sign-in")
  const [currentSubject, setCurrentSubject] = useState<string>("")
  const [currentLesson, setCurrentLesson] = useState<string>("")

  switch (view) {
    case "sign-in":
      return <SignInPage onSignIn={() => setView("dashboard")} />

    case "dashboard":
      return (
        <DashboardPage
          onSubjectClick={(subjectId) => {
            setCurrentSubject(subjectId)
            setView("prereq-tree")
          }}
          onSignOut={() => setView("sign-in")}
        />
      )

    case "prereq-tree":
      return (
        <PrereqTreePage
          subjectId={currentSubject}
          onBack={() => setView("dashboard")}
          onSubjectSelect={(subjectId) => {
            setCurrentSubject(subjectId)
            setView("subject")
          }}
        />
      )

    case "subject":
      return (
        <SubjectPage
          subjectId={currentSubject}
          onBack={() => setView("prereq-tree")}
          onLessonClick={(nodeId) => {
            setCurrentLesson(nodeId)
            setView("lesson")
          }}
        />
      )

    case "lesson":
      return (
        <LessonPage
          nodeId={currentLesson}
          onBack={() => setView("subject")}
          onComplete={() => setView("subject")}
        />
      )

    default:
      return null
  }
}
