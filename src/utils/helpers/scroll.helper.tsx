export const scrollToMyRef = (ref): void => {
  const scroll =
    ref.current.scrollHeight -
    ref.current.clientHeight;
  ref.current.scrollTo(0, scroll);
};
