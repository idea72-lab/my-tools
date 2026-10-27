
import type { Metadata } from 'next'
import { Percent } from 'lucide-react'
import { AdSlot } from '@/components/ad-slot'
import { ContactForm } from '@/components/contact-form'
import { PrivacyPolicy } from '@/components/privacy-policy'
import { ToolTabs } from '@/components/tool-tabs'
import { DiscountCalculator } from '@/components/waribiki/discount-calculator'
import { WaribikiGuideSections } from '@/components/waribiki/guide-sections'

export const metadata: Metadata = {
  title: '割引・セール価格計算ツール｜〇％OFFはいくら？二重割引にも対応',
  description:
    '元の価格と割引率を入力するだけで、割引後の価格とお得になった金額を自動計算。「さらに〇％OFF」の二重割引にも対応した、セール中にスマホですぐ使える無料の割引計算ツールです。',
}

export default function WaribikiPage() {
  return (
    <div className="min-h-dvh bg-muted/40">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pt-4 pb-10">
        <AdSlot position="top" />
        <ToolTabs />

        <header className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Percent className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold leading-tight text-balance">割引・セール価格計算ツール</h1>
            <p className="text-xs text-muted-foreground">〇％OFFでいくら？をすぐ計算</p>
          </div>
        </header>

        <main className="flex flex-col gap-10">
          <DiscountCalculator />
          <WaribikiGuideSections />
        </main>

        <footer className="flex flex-col gap-8 border-t pt-8">
          <PrivacyPolicy />
          <ContactForm />
          <p className="text-center text-xs text-muted-foreground">© 割引・セール価格計算ツール</p>
        </footer>

        <AdSlot position="bottom" />
      </div>
    </div>
  )
}
