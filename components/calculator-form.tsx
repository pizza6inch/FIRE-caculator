"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { CalculatorInputs } from "@/lib/calculator"

interface CalculatorFormProps {
  inputs: CalculatorInputs
  onChange: (inputs: CalculatorInputs) => void
}

export function CalculatorForm({ inputs, onChange }: CalculatorFormProps) {
  const handleChange = (field: keyof CalculatorInputs, value: number) => {
    onChange({ ...inputs, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>輸入你的財務數據</CardTitle>
        <CardDescription>
          調整下方參數，計算你的財富自由之路
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 每月生活費 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlyExpenses">每月生活費</Label>
            <span className="text-sm font-medium text-foreground">
              NT$ {inputs.monthlyExpenses.toLocaleString()}
            </span>
          </div>
          <Input
            id="monthlyExpenses"
            type="number"
            value={inputs.monthlyExpenses}
            onChange={(e) => handleChange("monthlyExpenses", Number(e.target.value))}
            min={0}
            step={1000}
          />
          <Slider
            value={[inputs.monthlyExpenses]}
            onValueChange={([value]) => handleChange("monthlyExpenses", value)}
            min={10000}
            max={200000}
            step={1000}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground">
            包含房租、飲食、交通、娛樂等所有支出
          </p>
        </div>

        {/* 目前資產 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="currentAssets">目前資產</Label>
            <span className="text-sm font-medium text-foreground">
              NT$ {inputs.currentAssets.toLocaleString()}
            </span>
          </div>
          <Input
            id="currentAssets"
            type="number"
            value={inputs.currentAssets}
            onChange={(e) => handleChange("currentAssets", Number(e.target.value))}
            min={0}
            step={10000}
          />
          <Slider
            value={[inputs.currentAssets]}
            onValueChange={([value]) => handleChange("currentAssets", value)}
            min={0}
            max={50000000}
            step={100000}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground">
            可投資的淨資產（不含自住房產）
          </p>
        </div>

        {/* 每月投資金額 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="monthlyInvestment">每月投資金額</Label>
            <span className="text-sm font-medium text-foreground">
              NT$ {inputs.monthlyInvestment.toLocaleString()}
            </span>
          </div>
          <Input
            id="monthlyInvestment"
            type="number"
            value={inputs.monthlyInvestment}
            onChange={(e) => handleChange("monthlyInvestment", Number(e.target.value))}
            min={0}
            step={1000}
          />
          <Slider
            value={[inputs.monthlyInvestment]}
            onValueChange={([value]) => handleChange("monthlyInvestment", value)}
            min={0}
            max={100000}
            step={1000}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground">
            每個月固定投入的金額
          </p>
        </div>

        {/* 年化報酬率 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="annualReturnRate">年化報酬率</Label>
            <span className="text-sm font-medium text-foreground">
              {inputs.annualReturnRate}%
            </span>
          </div>
          <Slider
            value={[inputs.annualReturnRate]}
            onValueChange={([value]) => handleChange("annualReturnRate", value)}
            min={1}
            max={12}
            step={0.5}
          />
          <p className="text-xs text-muted-foreground">
            長期股市平均約 5-7%，保守建議使用 5%
          </p>
        </div>

        {/* 投資年數 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="investmentYears">投資年數</Label>
            <span className="text-sm font-medium text-foreground">
              {inputs.investmentYears} 年
            </span>
          </div>
          <Slider
            value={[inputs.investmentYears]}
            onValueChange={([value]) => handleChange("investmentYears", value)}
            min={1}
            max={50}
            step={1}
          />
          <p className="text-xs text-muted-foreground">
            預計持續投資的時間
          </p>
        </div>

        {/* 提領率 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="withdrawalRate">提領率</Label>
            <span className="text-sm font-medium text-foreground">
              {inputs.withdrawalRate}%
            </span>
          </div>
          <Slider
            value={[inputs.withdrawalRate]}
            onValueChange={([value]) => handleChange("withdrawalRate", value)}
            min={2}
            max={6}
            step={0.5}
          />
          <p className="text-xs text-muted-foreground">
            退休後每年從資產中提領的比例，4% 是常用標準
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
