import type { Metadata } from 'next'
import { Scale } from 'lucide-react'
import { ToolTabs } from '@/components/tool-tabs'
import { AdSlot } from '@/components/ad-slot'
import { ContactForm } from '@/components/contact-form'
import { PrivacyPolicy } from '@/components/privacy-policy'
import { UnitPriceComparator } from '@/components/tanka/comparator'
import { TankaGuideSections } from '@/components/tanka/guide-sections'

export const metadata: Metadata = {
  title: '単価比較ツール｜どっちがお買い得？1gあたりの価格を一発計算',
  description:
    '2つの商品の価格と容量を入力するだけで、1g・1ml・1個あたりの単価を自動計算。どちらが何％お得かがひと目でわかる、買い物中にスマホですぐ使える無料の単価比較ツールです。',
}

export default function TankaPage() {
  return (
    <div className="min-h-dvh bg-muted/40">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pt-4 pb-10">
        <AdSlot position="top" />
        <ToolTabs />

        <header className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Scale className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold leading-tight text-balance">単価比較ツール</h1>
            <p className="text-xs text-muted-foreground">どっちがお買い得？を一瞬で判定</p>
          </div>
        </header>

        <main className="flex flex-col gap-10">
          <UnitPriceComparator />
          <TankaGuideSections />
        </main>

        <footer className="flex flex-col gap-8 border-t pt-8">
          <PrivacyPolicy />
          <ContactForm />
          <p className="text-center text-xs text-muted-foreground">© 単価比較ツール</p>
        </footer>

        <AdSlot position="bottom" />
      </div>
    </div>
  )
}
