"use client"

import * as React from "react"
import { useScroll } from "framer-motion"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div
      className="progress-bar fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left"
      style={{ transform: `scaleX(${scrollYProgress})` }}
    />
  )
}