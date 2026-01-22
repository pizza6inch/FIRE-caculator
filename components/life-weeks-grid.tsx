"use client"

import React from "react"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const LIFE_EXPECTANCY = 85
const WEEKS_PER_YEAR = 52
const TOTAL_WEEKS = LIFE_EXPECTANCY * WEEKS_PER_YEAR

// Time allocation per day
const HOURS_PER_DAY = 24
const WORK_HOURS = 8
const SLEEP_HOURS = 8
const FREE_HOURS = HOURS_PER_DAY - WORK_HOURS - SLEEP_HOURS

// Proportions
const WORK_PROPORTION = WORK_HOURS / HOURS_PER_DAY
const SLEEP_PROPORTION = SLEEP_HOURS / HOURS_PER_DAY
const FREE_PROPORTION = FREE_HOURS / HOURS_PER_DAY

export function LifeWeeksGrid() {
  const [age, setAge] = useState(30)

  const calculations = useMemo(() => {
    const validAge = Math.max(0, Math.min(age, LIFE_EXPECTANCY))
    const weeksLived = validAge * WEEKS_PER_YEAR
    const remainingWeeks = Math.max(0, (LIFE_EXPECTANCY - validAge) * WEEKS_PER_YEAR)
    
    // Calculate proportional weeks for remaining time
    const workWeeks = Math.round(remainingWeeks * WORK_PROPORTION)
    const sleepWeeks = Math.round(remainingWeeks * SLEEP_PROPORTION)
    const freeWeeks = Math.round(remainingWeeks * FREE_PROPORTION)

    return {
      weeksLived,
      remainingWeeks,
      workWeeks,
      sleepWeeks,
      freeWeeks,
      yearsRemaining: LIFE_EXPECTANCY - validAge,
    }
  }, [age])

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value)) {
      setAge(Math.max(0, Math.min(value, LIFE_EXPECTANCY)))
    } else if (e.target.value === "") {
      setAge(0)
    }
  }

  // Generate grid dots
  const dots = useMemo(() => {
    const result = []
    const { weeksLived, workWeeks, sleepWeeks } = calculations
    
    for (let i = 0; i < TOTAL_WEEKS; i++) {
      let colorClass = ""
      const isCurrentWeek = i === weeksLived
      
      if (i < weeksLived) {
        // Past weeks - gray
        colorClass = "bg-foreground/20"
      } else if (i < weeksLived + workWeeks) {
        // Work weeks - blue
        colorClass = "bg-blue-500"
      } else if (i < weeksLived + workWeeks + sleepWeeks) {
        // Sleep weeks - dark gray
        colorClass = "bg-foreground/40"
      } else {
        // Free weeks - green
        colorClass = "bg-emerald-500"
      }
      
      result.push(
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${colorClass} ${isCurrentWeek ? "ring-2 ring-accent ring-offset-1" : ""}`}
          title={isCurrentWeek ? "你現在在這裡" : undefined}
        />
      )
    }
    return result
  }, [calculations])

  return (
    <div className="mx-auto max-w-4xl">
      {/* Age Input */}
      <div className="mb-8 flex flex-col items-center gap-4">
        <Label htmlFor="age-input" className="text-base font-medium text-foreground">
          輸入你的年齡
        </Label>
        <div className="flex items-center gap-3">
          <Input
            id="age-input"
            type="number"
            min={0}
            max={85}
            value={age}
            onChange={handleAgeChange}
            className="h-14 w-24 text-center text-2xl font-semibold"
          />
          <span className="text-lg text-muted-foreground">歲</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 flex flex-wrap items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-foreground/20" />
          <span className="text-muted-foreground">已經過去</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">工作時間</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-foreground/40" />
          <span className="text-muted-foreground">睡眠時間</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-emerald-500" />
          <span className="text-muted-foreground">自由時間</span>
        </div>
      </div>

      {/* Dot Grid */}
      <div className="mb-8 rounded-lg border border-border bg-card p-6">
        <div 
          className="mx-auto grid gap-0.5"
          style={{
            gridTemplateColumns: `repeat(${WEEKS_PER_YEAR}, minmax(0, 1fr))`,
            maxWidth: "100%",
          }}
        >
          {dots}
        </div>
        <p className="mt-4 text-center text-xs text-muted-foreground">
          每一個點代表 1 週，共 {TOTAL_WEEKS.toLocaleString()} 週（假設壽命 {LIFE_EXPECTANCY} 歲）
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 text-center md:grid-cols-4">
        <div className="rounded-lg bg-muted p-4">
          <p className="text-2xl font-bold text-foreground">
            {calculations.weeksLived.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">已過去</p>
        </div>
        <div className="rounded-lg bg-blue-500/10 p-4">
          <p className="text-2xl font-bold text-blue-600">
            {calculations.workWeeks.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">工作時間</p>
        </div>
        <div className="rounded-lg bg-foreground/5 p-4">
          <p className="text-2xl font-bold text-foreground/60">
            {calculations.sleepWeeks.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">睡眠時間</p>
        </div>
        <div className="rounded-lg bg-emerald-500/10 p-4">
          <p className="text-2xl font-bold text-emerald-600">
            {calculations.freeWeeks.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">自由時間</p>
        </div>
      </div>

      {/* Contextual Copy */}
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-6 text-center">
          <p className="mb-2 text-lg text-foreground">
            每天 24 小時中，8 小時工作、8 小時睡覺。
          </p>
          <p className="text-muted-foreground">
            只剩下 <span className="font-semibold text-emerald-600">8 小時</span> 是真正屬於你的。
          </p>
        </div>

        <div className="mb-6 rounded-lg bg-emerald-500/5 p-4">
          <p className="mb-3 text-center font-medium text-foreground">
            這 {calculations.freeWeeks.toLocaleString()} 週的自由時間，你本可以：
          </p>
          <ul className="mx-auto max-w-md space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">-</span>
              <span>陪伴家人，享受真正的相處時光</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">-</span>
              <span>做你真正熱愛的事情</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">-</span>
              <span>學習一直想學的技能或知識</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600">-</span>
              <span>享受不被工作追趕的人生節奏</span>
            </li>
          </ul>
        </div>

        <div className="text-center">
          <p className="mb-2 text-foreground">
            財富自由的意義，就是讓
            <span className="font-semibold text-emerald-600">綠色的部分變多</span>。
          </p>
          <p className="text-sm text-muted-foreground">
            把工作從「生存必須」變成「自由選擇」，
            把每天的 8 小時還給自己。
          </p>
        </div>
      </div>
    </div>
  )
}
