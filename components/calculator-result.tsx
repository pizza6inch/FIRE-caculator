"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, Target, TrendingUp, Calendar } from "lucide-react"
import type { CalculationResult } from "@/lib/calculator"
import { formatCurrency } from "@/lib/calculator"

interface CalculatorResultProps {
  result: CalculationResult
}

export function CalculatorResult({ result }: CalculatorResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          計算結果
          {result.isAchievable ? (
            <Badge variant="default" className="bg-accent text-accent-foreground">
              可達成
            </Badge>
          ) : (
            <Badge variant="secondary">
              需要更多時間
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          根據你的數據，這是你的財富自由計畫
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 主要結果 */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Target className="h-4 w-4" />
              財富自由目標
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(result.fiNumber)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              年支出 {formatCurrency(result.annualExpenses)} ÷ {4}%
            </p>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              預計最終資產
            </div>
            <p className="text-2xl font-bold text-foreground">
              {formatCurrency(result.finalAssets)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {result.yearlyData.length} 年後的資產總額
            </p>
          </div>
        </div>

        {/* 達成狀態 */}
        <div className={`rounded-lg p-4 ${
          result.isAchievable 
            ? "border border-accent/20 bg-accent/5" 
            : "border border-border bg-muted/50"
        }`}>
          <div className="flex items-start gap-3">
            {result.isAchievable ? (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            ) : (
              <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium text-foreground">
                {result.isAchievable 
                  ? "恭喜！你可以在設定的時間內達成財富自由" 
                  : "以目前的計畫，需要更長的時間才能達成"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {result.isAchievable 
                  ? `你的最終資產將超過目標 ${formatCurrency(result.finalAssets - result.fiNumber)}`
                  : `距離目標還差 ${formatCurrency(result.fiNumber - result.finalAssets)}`}
              </p>
            </div>
          </div>
        </div>

        {/* 預計達成時間 */}
        {result.yearsToFI !== null && (
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              預計達成時間
            </div>
            <p className="text-xl font-bold text-foreground">
              {result.yearsToFI === 0 ? (
                "你已經財富自由了！"
              ) : (
                <>
                  約 <span className="text-accent">{result.yearsToFI}</span> 年後
                </>
              )}
            </p>
            {result.yearsToFI > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                大約在 {new Date().getFullYear() + result.yearsToFI} 年達成
              </p>
            )}
          </div>
        )}

        {result.yearsToFI === null && (
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              以目前的投資計畫，可能需要超過 100 年才能達成財富自由。
              建議增加每月投資金額或降低每月支出。
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
