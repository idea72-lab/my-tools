export type RoundingUnit = 1 | 10 | 100

export type MemberInput = {
  id: string
  name: string
  paid: number
}

export type MemberResult = {
  id: string
  name: string
  paid: number
  burden: number
  balance: number
}

export type Transfer = {
  from: string
  to: string
  amount: number
}

export type SettlementResult = {
  total: number
  unit: RoundingUnit
  share: number
  remainder: number
  organizerName: string
  members: MemberResult[]
  transfers: Transfer[]
}

export function parseAmount(value: string): number {
  const halfWidth = value.replace(/[０-９]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0),
  )
  const digits = halfWidth.replace(/[^0-9]/g, '')
  return digits ? Number.parseInt(digits, 10) : 0
}

export function formatYen(value: number): string {
  return `${value.toLocaleString('ja-JP')}円`
}

export function displayName(name: string, index: number): string {
  return name.trim() || `メンバー${index + 1}`
}

export function calculateSettlement(
  total: number,
  members: MemberInput[],
  unit: RoundingUnit,
): SettlementResult {
  const count = members.length
  const share = Math.floor(total / count / unit) * unit
  const remainder = total - share * count

  const memberResults: MemberResult[] = members.map((m, i) => {
    const burden = share + (i === 0 ? remainder : 0)
    return {
      id: m.id,
      name: displayName(m.name, i),
      paid: m.paid,
      burden,
      balance: m.paid - burden,
    }
  })

  const creditors = memberResults
    .filter((m) => m.balance > 0)
    .map((m) => ({ name: m.name, amount: m.balance }))
    .sort((a, b) => b.amount - a.amount)
  const debtors = memberResults
    .filter((m) => m.balance < 0)
    .map((m) => ({ name: m.name, amount: -m.balance }))
    .sort((a, b) => b.amount - a.amount)

  const transfers: Transfer[] = []
  let ci = 0
  let di = 0
  while (ci < creditors.length && di < debtors.length) {
    const amount = Math.min(creditors[ci].amount, debtors[di].amount)
    if (amount > 0) {
      transfers.push({ from: debtors[di].name, to: creditors[ci].name, amount })
    }
    creditors[ci].amount -= amount
    debtors[di].amount -= amount
    if (creditors[ci].amount === 0) ci++
    if (debtors[di].amount === 0) di++
  }

  return {
    total,
    unit,
    share,
    remainder,
    organizerName: memberResults[0]?.name ?? '',
    members: memberResults,
    transfers,
  }
}

export function buildShareText(result: SettlementResult): string {
  const lines = [
    '【割り勘・精算結果】',
    `合計金額：${formatYen(result.total)}（${result.members.length}人）`,
    `1人あたり：${formatYen(result.share)}`,
  ]
  if (result.remainder > 0) {
    lines.push(`端数 ${formatYen(result.remainder)} は ${result.organizerName} さんが負担`)
  }
  lines.push('', '▼精算方法')
  if (result.transfers.length === 0) {
    lines.push('精算は不要です')
  } else {
    for (const t of result.transfers) {
      lines.push(`${t.from} → ${t.to}：${formatYen(t.amount)}`)
    }
  }
  return lines.join('\n')
}
