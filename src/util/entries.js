import {compareDates, renderDate} from './util';

export function massage(balance, entries) {
  const massaged = entries.map(entry => ({
    id: entry.id,
    title: entry.title,
    date: renderDate(entry.date),
    money: entry.money,
    income: entry.money >= 0,
    debt: entry.money < 0,
  })).sort((a, b) => compareDates(a.date, b.date));

  let rollingBalance = balance;

  const rows = [];
  massaged.forEach(entry => {
    rollingBalance += entry.money;
    rows.push({
      ...entry,
      balance: rollingBalance,
    });
  });
  return rows;
}
