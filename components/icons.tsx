"use client"

import { cn } from "@/lib/utils"

export function MountainLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("size-8", className)}
      aria-hidden="true"
    >
      <path
        d="M20 4L36 34H4L20 4Z"
        className="fill-primary"
        strokeWidth="0"
      />
      <path
        d="M20 4L28 20L24 18L20 22L16 18L12 20L20 4Z"
        className="fill-primary-foreground/30"
        strokeWidth="0"
      />
      <circle cx="20" cy="10" r="2" className="fill-primary-foreground" />
    </svg>
  )
}

export function SubjectIcon({
  type,
  className,
}: {
  type: string
  className?: string
}) {
  const iconClass = cn("size-6", className)
  switch (type) {
    case "integral":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path
            d="M12 3c-1 0-2.5 1-2.5 3v12c0 2-1.5 3-2.5 3"
            className="stroke-current"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      )
    case "matrix":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <rect x="4" y="4" width="6" height="6" rx="1" className="fill-current opacity-60" />
          <rect x="14" y="4" width="6" height="6" rx="1" className="fill-current opacity-40" />
          <rect x="4" y="14" width="6" height="6" rx="1" className="fill-current opacity-40" />
          <rect x="14" y="14" width="6" height="6" rx="1" className="fill-current opacity-60" />
        </svg>
      )
    case "flask":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path
            d="M9 3h6M10 3v7l-5 9a1 1 0 001 1h12a1 1 0 001-1l-5-9V3"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "atom":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="2" className="fill-current" />
          <ellipse cx="12" cy="12" rx="9" ry="4" className="stroke-current" strokeWidth="1.5" />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4"
            transform="rotate(60 12 12)"
            className="stroke-current"
            strokeWidth="1.5"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="9"
            ry="4"
            transform="rotate(120 12 12)"
            className="stroke-current"
            strokeWidth="1.5"
          />
        </svg>
      )
    case "book":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path
            d="M4 19.5A2.5 2.5 0 016.5 17H20"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "code":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path
            d="M16 18l6-6-6-6M8 6l-6 6 6 6"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <path
            d="M18 20V10M12 20V4M6 20v-6"
            className="stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden="true">
          <circle cx="12" cy="12" r="8" className="stroke-current" strokeWidth="2" />
        </svg>
      )
  }
}
