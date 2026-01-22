import React from "react"
import type { Metadata } from 'next'
import { Noto_Sans_TC, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const notoSansTC = Noto_Sans_TC({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: '財富自由計算器 | 計算你的財務獨立之路',
  description: '免費的財富自由計算工具，幫助你計算達成財務獨立所需的時間與金額。使用複利與 4% 提領率規則，讓數學告訴你財富自由並不遙遠。',
  keywords: '財富自由, FIRE, 財務獨立, 提早退休, 複利計算, 被動收入, 投資規劃',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-TW">
      <body className={`${notoSansTC.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
