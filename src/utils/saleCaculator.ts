import { formatCurrency } from './formatCurrency'

export const saleCaculator = (price: number, sale: { value: number; isPercent: boolean }) => {
  // const percent = sale.isPercent ? sale.value : Math.round((sale.value / price) * 100)
  const percent = sale.isPercent ? sale.value + '%' : formatCurrency(sale.value)
  return percent
}
