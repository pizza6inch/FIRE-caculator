"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { calculateSavingsTable, formatCurrency } from "@/lib/calculator"
import { Info } from "lucide-react"

export function SavingsCalculator() {
  const [fiTarget, setFiTarget] = useState(15000000) // 1500 萬
  const [currentAssets, setCurrentAssets] = useState(1000000) // 100 萬
  const [annualReturnRate, setAnnualReturnRate] = useState(5)
  const [targetYears, setTargetYears] = useState(15)

  const savingsTable = useMemo(() => {
    return calculateSavingsTable(fiTarget, currentAssets, annualReturnRate)
  }, [fiTarget, currentAssets, annualReturnRate])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('zh-TW').format(num)
  }

  const handleFiTargetChange = (value: string) => {
    const num = Number.parseInt(value.replace(/,/g, ''), 10)
    if (!Number.isNaN(num)) {
      setFiTarget(num)
    } else if (value === '') {
      setFiTarget(0)
    }
  }

  const handleCurrentAssetsChange = (value: string) => {
    const num = Number.parseInt(value.replace(/,/g, ''), 10)
    if (!Number.isNaN(num)) {
      setCurrentAssets(num)
    } else if (value === '') {
      setCurrentAssets(0)
    }
  }

  return (
    <div className="space-y-8">
      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>輸入參數</CardTitle>
          <CardDescription>
            設定你的財富自由目標與現況，計算每年需要存多少錢
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fiTarget">財富自由目標金額</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  NT$
                </span>
                <Input
                  id="fiTarget"
                  type="text"
                  value={formatNumber(fiTarget)}
                  onChange={(e) => handleFiTargetChange(e.target.value)}
                  className="pl-12"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                例如：年支出 60 萬，4% 提領率 = 1,500 萬
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAssets">現存資產</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  NT$
                </span>
                <Input
                  id="currentAssets"
                  type="text"
                  value={formatNumber(currentAssets)}
                  onChange={(e) => handleCurrentAssetsChange(e.target.value)}
                  className="pl-12"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>年化報酬率</Label>
                <span className="text-sm font-medium text-accent">
                  {annualReturnRate.toFixed(1)}%
                </span>
              </div>
              <Slider
                value={[annualReturnRate]}
                onValueChange={(value) => setAnnualReturnRate(value[0])}
                min={0}
                max={12}
                step={0.5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                台股長期年化報酬約 5-7%，美股約 7-10%
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>目標達成年數</Label>
                <span className="text-sm font-medium text-accent">
                  {targetYears} 年
                </span>
              </div>
              <Slider
                value={[targetYears]}
                onValueChange={(value) => setTargetYears(value[0])}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="border-accent/50 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 text-accent" />
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                若要在 {targetYears} 年內達成財富自由
              </p>
              <p className="text-muted-foreground">
                你需要每月存{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(savingsTable[targetYears - 1]?.monthlyRequired || 0)}
                </span>
                ，相當於每天{" "}
                <span className="font-semibold text-foreground">
                  {formatCurrency(savingsTable[targetYears - 1]?.dailyRequired || 0)}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Savings Table */}
      <Card>
        <CardHeader>
          <CardTitle>儲蓄需求表</CardTitle>
          <CardDescription>
            不同年數下，達成 {formatCurrency(fiTarget)} 所需的定期儲蓄金額
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">年數</TableHead>
                  <TableHead className="text-right">每年需存</TableHead>
                  <TableHead className="text-right">每月需存</TableHead>
                  <TableHead className="text-right">每週需存</TableHead>
                  <TableHead className="text-right">每天需存</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {savingsTable.map((row) => {
                  const isTarget = row.years === targetYears
                  return (
                    <TableRow
                      key={row.years}
                      className={
                        isTarget
                          ? "bg-accent/10 font-medium"
                          : ""
                      }
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {row.years}
                          {isTarget && (
                            <Badge variant="secondary" className="bg-accent text-accent-foreground">
                              目標
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(row.yearlyRequired)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(row.monthlyRequired)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(row.weeklyRequired)}
                      </TableCell>
                      <TableCell className="text-right font-mono">
                        {formatCurrency(row.dailyRequired)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
