const sections = [
  {
    title: '広告の配信について',
    body: '当サイトでは、第三者配信の広告サービス「Google アドセンス」を利用しています。Google などの第三者配信事業者は、Cookie を使用して、ユーザーが当サイトや他のウェブサイトに過去にアクセスした際の情報に基づいて広告を配信します。',
  },
  {
    title: 'Cookie の無効化について',
    body: 'Google が広告 Cookie を使用することにより、ユーザーが当サイトや他のサイトにアクセスした際の情報に基づいて、Google やそのパートナーが適切な広告を表示できます。ユーザーは Google の広告設定（https://adssettings.google.com/）でパーソナライズ広告を無効にできます。また、www.aboutads.info にアクセスすれば、第三者配信事業者の Cookie を無効にすることもできます。',
  },
  {
    title: 'アクセス解析ツールについて',
    body: '当サイトでは、サービス向上のためにアクセス解析ツールを利用する場合があります。これらのツールはトラフィックデータの収集のために Cookie を使用しますが、このデータは匿名で収集されており、個人を特定するものではありません。',
  },
  {
    title: '入力データの取り扱い',
    body: '本ツールに入力された金額や名前などの情報は、お使いのブラウザ上でのみ計算に使用され、サーバーへ送信・保存されることはありません。',
  },
  {
    title: 'お問い合わせで取得する個人情報',
    body: 'お問い合わせフォームでご入力いただいたお名前・メールアドレス等は、お問い合わせへの回答のためにのみ利用し、法令に基づく場合を除き第三者に提供することはありません。',
  },
  {
    title: 'プライバシーポリシーの変更',
    body: '当サイトは、必要に応じて本ポリシーの内容を予告なく変更することがあります。変更後のポリシーは本ページに掲載した時点から効力を生じるものとします。',
  },
]

export function PrivacyPolicy() {
  return (
    <section aria-labelledby="privacy-heading" className="flex flex-col gap-3">
      <h2 id="privacy-heading" className="text-base font-bold">
        プライバシーポリシー
      </h2>
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-4 text-xs leading-relaxed text-muted-foreground shadow-sm">
        {sections.map((section) => (
          <div key={section.title} className="flex flex-col gap-1">
            <h3 className="text-sm font-semibold text-foreground">{section.title}</h3>
            <p className="break-words">{section.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
