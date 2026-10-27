import { Wallet } from 'lucide-react'
import { ToolTabs } from '@/components/tool-tabs'
import { AdSlot } from '@/components/ad-slot'
import { ContactForm } from '@/components/contact-form'
import { GuideSections } from '@/components/guide-sections'
import { PrivacyPolicy } from '@/components/privacy-policy'
import { WarikanCalculator } from '@/components/warikan/calculator'

export default function Page() {
  return (
    <div className="min-h-dvh bg-muted/40">
      <div className="mx-auto flex w-full max-w-md flex-col gap-5 px-4 pt-4 pb-10">
        <AdSlot position="top" />
        <ToolTabs />

        <header className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wallet className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h1 className="text-xl font-bold leading-tight text-balance">割り勘・立替精算ツール</h1>
            <p className="text-xs text-muted-foreground">誰が誰にいくら払うか、すぐわかる</p>
          </div>
        </header>

        <main className="flex flex-col gap-10">
          <WarikanCalculator />
          <GuideSections />
        </main>

        <footer className="flex flex-col gap-8 border-t pt-8">
          <PrivacyPolicy />
          <ContactForm />
          <p className="text-center text-xs text-muted-foreground">© 割り勘・立替精算ツール</p>
        </footer>

        <AdSlot position="bottom" />
      </div>
    </div>
  )
}
