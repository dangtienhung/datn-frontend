export const formatCurrency = (price: number) => {
  const formatCurrency = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
  return formatCurrency
}

export const formatNumberDigits = (number: number) => {
  return Number(new Intl.NumberFormat('vi-VN').format(number))
}
