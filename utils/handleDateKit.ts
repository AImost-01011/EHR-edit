export const nowDay: () => number = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const nowDate = new Date().getDate();

  const todayDate = new Date(`${year}/${month}/${nowDate}`).getTime();

  return todayDate;
};

export const nextDay: () => number = () => {
  const tomorrow = nowDay() + 86400000;

  return tomorrow;
};
