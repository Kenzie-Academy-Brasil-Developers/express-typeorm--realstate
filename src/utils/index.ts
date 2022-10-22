export const dateFormatter = (date: Date | string, type: 'day' | 'time') => {
  switch (type) {
    case 'day':
      return date.toString().replace(/\//g, '-')
    case 'time':
      return date.toString().length === 4 ? `0${date}` : date;
  }
}

export const isClosed = (date: Date) => {
  const weekend = date.getDay() < 1 || date.getDay() > 5;
  const BRT = date.getHours();

  const beforeOpening = BRT < 8;
  const afterClosing = BRT > 17 && date.getMinutes() > 0;
  const closed = beforeOpening || afterClosing;

  return weekend || closed;
};
