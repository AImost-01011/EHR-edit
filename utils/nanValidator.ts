export const nanValidator: (props: string | number) => number = (props) => {
  if (isNaN(Number(props))) {
    return 0;
  } else {
    return Number(props);
  }
};
