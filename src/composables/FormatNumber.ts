const formatNumber = (number: number): string => (Intl.NumberFormat('en-US', {notation: "compact"}).format(number));

export { formatNumber }