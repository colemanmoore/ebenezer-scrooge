import moment from 'moment'

const dateFormats = [
  'MM/DD/YYYY',
  'MM/DD'
]

export function validateMoney(money) {
  if (!money) return false;

  const val = parseFloat(money)
  return (typeof val === 'number' && !isNaN(val))
}

export function validateDate(date) {
  if (!date) return false;

  let d = moment(date, dateFormats)
  if (d === null || !d.isValid()) {
    return false
  }

  return date.indexOf(d.format('M/D/YYYY')) >= 0
      || date.indexOf(d.format('MM/DD/YYYY')) >= 0
      || date.indexOf(d.format('M/D/YY')) >= 0
      || date.indexOf(d.format('MM/DD/YY')) >= 0
      || date.indexOf(d.format('MM/DD')) >=0
      || date.indexOf(d.format('M/D')) >=0
      || date.indexOf(d.format('MM/D')) >=0
      || date.indexOf(d.format('M/DD')) >=0;
}

export function createDate(str) {
  let input = str;
  if (str.match(/^([0-9]{1,2})\/([0-9]{1,2})$/g)) {
    return createDateNoYear(str);
  }
  return moment(input, dateFormats).toDate()
}

function createDateNoYear(str) {
  const m = moment(str, dateFormats)
  const now = moment()

  // convert m to current year
  m.year(now.year())
  if (m.isBefore(now)) {
    m.year(m.year()+1)
  }
  return m.toDate()
}

export function compareDates(d1, d2) {
  if (moment(d1, dateFormats).isBefore(moment(d2, dateFormats))) return -1
  if (moment(d1, dateFormats).isAfter(moment(d2, dateFormats))) return 1
  return 0
}

export function renderDate(date) {
  return moment(date).format('M/D/YY')
}
