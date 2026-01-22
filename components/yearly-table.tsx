"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { YearlyData } from "@/lib/calculator"
import { formatCurrency } from "@/lib/calculator"

interface YearlyTableProps {
  data: YearlyData[]
  fiNumber: number
}

export function YearlyTable({ data, fiNumber }: YearlyTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>年度資產成長表</CardTitle>
        <CardDescription>
          逐年追蹤你的資產成長軌跡
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">年份</TableHead>
                <TableHead className="text-right">年初資產</TableHead>
                <TableHead className="text-right">年投入</TableHead>
                <TableHead className="text-right">年報酬</TableHead>
                <TableHead className="text-right">年末資產</TableHead>
                <TableHead className="w-24 text-center">狀態</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row) => {
                const isFI = row.endAssets >= fiNumber
                return (
                  <TableRow 
                    key={row.year}
                    className={isFI ? "bg-accent/5" : ""}
                  >
                    <TableCell className="font-medium">
                      第 {row.year} 年
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatCurrency(row.startAssets)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm">
                      {formatCurrency(row.annualContribution)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm text-accent">
                      +{formatCurrency(row.annualReturn)}
                    </TableCell>
                    <TableCell className="text-right font-mono text-sm font-medium">
                      {formatCurrency(row.endAssets)}
                    </TableCell>
                    <TableCell className="text-center">
                      {isFI ? (
                        <Badge variant="default" className="bg-accent text-accent-foreground">
                          達標
                        </Badge>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {((row.endAssets / fiNumber) * 100).toFixed(0)}%
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 rounded-lg bg-muted p-3 text-sm text-muted-foreground">
          <p>
            <strong>說明：</strong>年報酬 = 年末資產 - 年初資產 - 年投入。
            此計算使用複利公式，每月投入後計算利息。
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
