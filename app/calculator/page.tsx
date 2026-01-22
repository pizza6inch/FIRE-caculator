"use client"

import { useState, useMemo } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CalculatorForm } from "@/components/calculator-form"
import { CalculatorResult } from "@/components/calculator-result"
import { YearlyTable } from "@/components/yearly-table"
import { calculate, defaultInputs, type CalculatorInputs } from "@/lib/calculator"

export default function CalculatorPage() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs)

  const result = useMemo(() => calculate(inputs), [inputs])

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          {/* Page Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
              財富自由計算器
            </h1>
            <p className="text-muted-foreground">
              輸入你的財務數據，計算達成財富自由所需的時間與金額
            </p>
          </div>

          {/* Calculator Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Input Form */}
            <div>
              <CalculatorForm inputs={inputs} onChange={setInputs} />
            </div>

            {/* Results */}
            <div className="space-y-8">
              <CalculatorResult result={result} />
            </div>
          </div>

          {/* Yearly Table */}
          <div className="mt-8">
            <YearlyTable data={result.yearlyData} fiNumber={result.fiNumber} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
