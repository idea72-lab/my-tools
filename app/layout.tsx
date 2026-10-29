import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import AdBanner from '@/components/AdBanner'
const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '割り勘・立替精算ツール｜誰が誰にいくら払うか一発計算',
  description:
    '合計金額・人数・各メンバーの立替金額を入力するだけで、1人あたりの負担額と「誰から誰へいくら支払えばいいか」を自動計算。10円・100円単位の切り下げにも対応した無料の割り勘計算ツールです。',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#0d9488',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} bg-background`}>
      <head>
       
      </head>
      <body className="font-sans antialiased">
      {children}

      {/* 追加：全ページ共通の広告表示 */}
      <div className="my-8 flex justify-center">
        <AdBanner />
      </div>

      {process.env.NODE_ENV === 'production' && <Analytics />}
    </body>
    </html>
  )
}
