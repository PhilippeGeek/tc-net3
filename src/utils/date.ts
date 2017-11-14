export function getDateOfISOWeek(w: number, y: number): Date {
  const simple = new Date(y, 0, 1 + (w - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4) {
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  } else {
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  }
  return ISOweekStart;
}

export function getWeekNumber(d: Date): number[] {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart: Date = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo: number = Math.ceil(( ( (d.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
}
