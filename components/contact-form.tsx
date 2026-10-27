'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const fieldClass =
  'w-full rounded-xl border bg-background px-3 py-3 text-base outline-none transition focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30'

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()
    setSubmitted(true)
  }

  return (
    <section aria-labelledby="contact-heading" className="flex flex-col gap-3">
      <h2 id="contact-heading" className="text-base font-bold">
        お問い合わせ
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="text-sm font-semibold">
            お名前
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            className={fieldClass}
            onChange={() => setSubmitted(false)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="text-sm font-semibold">
            メールアドレス
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            inputMode="email"
            className={fieldClass}
            onChange={() => setSubmitted(false)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-message" className="text-sm font-semibold">
            お問い合わせ内容
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={2000}
            className={`${fieldClass} resize-y`}
            onChange={() => setSubmitted(false)}
          />
        </div>
        <Button type="submit" className="h-12 rounded-xl text-base font-bold">
          <Send className="size-4" aria-hidden="true" />
          送信する
        </Button>
        <div aria-live="polite">
          {submitted && (
            <p className="flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-sm font-semibold text-primary">
              <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
              お問い合わせを受け付けました（デモ）
            </p>
          )}
        </div>
      </form>
    </section>
  )
}
