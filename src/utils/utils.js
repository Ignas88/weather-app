export const currentDateToString = (days, months) => {
  const currentDate = new Date();
  return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
    months[currentDate.getMonth()]
  }`;
}

export const timeToString = (ms) => {
  return new Date(ms * 1000).toLocaleTimeString().replace(/:\d+\s/, ' ');
}