export function convertDate(dateStr: string): {
  date: Date | null;
} {
  if (!/^\d{12}$/.test(dateStr)) {
    return { date: null };
  }

  const year = 2000 + parseInt(dateStr.substring(0, 2), 10);
  const month = parseInt(dateStr.substring(2, 4), 10) - 1;
  const day = parseInt(dateStr.substring(4, 6), 10);
  const hours = parseInt(dateStr.substring(6, 8), 10);
  const minutes = parseInt(dateStr.substring(8, 10), 10);
  const seconds = parseInt(dateStr.substring(10, 12), 10);

  const date = new Date(year, month, day, hours, minutes, seconds);

  return { date };
}
