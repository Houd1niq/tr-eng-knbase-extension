export function debounce(callback: (...args: any[]) => any, time = 1000) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, time);
  };
}
