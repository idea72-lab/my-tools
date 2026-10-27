import { ChevronDown } from 'lucide-react'

const STEPS = [
  { title: '元の価格を入力', body: '値札やタグに書かれている定価・通常価格（円）を入力します。' },
  { title: '割引率を選ぶ', body: '10%・20%・30%などのボタンをワンタップするか、任意の数字を入力します。' },
  {
    title: '追加割引があれば入力',
    body: '「表示価格からさらに〇％OFF」のような二重割引の場合は、追加割引の欄にも入力します。',
  },
  { title: '「計算する」をタップ', body: '割引後の価格と、いくらお得になったか（割引額・実質割引率）が表示されます。' },
]

const EXAMPLES = [
  {
    category: '衣料品セール',
    title: '5,980円のコートが30％OFF',
    detail: '5,980円 × 0.7',
    result: '割引後 4,186円（1,794円お得）',
  },
  {
    category: '二重割引',
    title: '8,000円の靴が20％OFF、さらにレジで10％OFF',
    detail: '8,000円 → 6,400円 → 5,760円',
    result: '割引後 5,760円（2,240円お得・実質28％OFF）',
  },
  {
    category: 'ネット通販',
    title: '12,800円の家電がクーポンで15％OFF',
    detail: '12,800円 × 0.85',
    result: '割引後 10,880円（1,920円お得）',
  },
]

const FAQS = [
  {
    q: '「20％OFF + さらに10％OFF」は30％OFFと同じですか？',
    a: '同じではありません。追加割引は1回目の割引後の価格に対してかかるため、実質の割引率は28％になります（100 × 0.8 × 0.9 = 72）。本ツールではこの順番どおりに計算しています。',
  },
  {
    q: '1円未満の端数はどうなりますか？',
    a: '各割引ステップごとに1円未満を切り捨てて計算しています。お店によって四捨五入や切り上げの場合もあるため、実際の価格は店頭表示をご確認ください。',
  },
  {
    q: '税込・税抜どちらで入力すればいいですか？',
    a: '割引の対象となる価格を入力してください。税込価格に割引が適用されるお店では税込価格を、税抜価格に割引が適用される場合は税抜価格を入力します。',
  },
  {
    q: '「半額」は何％OFFですか？',
    a: '半額は50％OFFです。「50%」のボタンをタップすると入力できます。',
  },
  {
    q: '入力したデータは保存されますか？',
    a: '入力内容はお使いの端末の画面上だけで計算され、サーバーに送信・保存されることはありません。',
  },
]

export function WaribikiGuideSections() {
  return (
    <div className="flex flex-col gap-8">
      <section aria-labelledby="howto-heading" className="flex flex-col gap-4">
        <h2 id="howto-heading" className="text-lg font-bold">
          使い方
        </h2>
        <ol className="flex flex-col gap-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-3">
              <span
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-bold">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="example-heading" className="flex flex-col gap-4">
        <h2 id="example-heading" className="text-lg font-bold">
          活用例
        </h2>
        <ul className="flex flex-col gap-3">
          {EXAMPLES.map((ex) => (
            <li key={ex.title} className="flex flex-col gap-2 rounded-2xl border bg-card p-4 shadow-sm">
              <span className="self-start rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                {ex.category}
              </span>
              <h3 className="text-sm font-bold">{ex.title}</h3>
              <p className="text-sm text-muted-foreground tabular-nums">{ex.detail}</p>
              <p className="rounded-lg bg-muted px-3 py-2 text-xs font-semibold leading-relaxed">{ex.result}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="faq-heading" className="flex flex-col gap-4">
        <h2 id="faq-heading" className="text-lg font-bold">
          よくある質問（Q&amp;A）
        </h2>
        <div className="flex flex-col gap-2">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group rounded-2xl border bg-card shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 p-4 text-sm font-bold [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="mr-1 text-primary">Q.</span>
                  {faq.q}
                </span>
                <ChevronDown className="size-4 shrink-0 transition group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">
                <span className="mr-1 font-bold text-foreground">A.</span>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  )
}
