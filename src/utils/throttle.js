export const throttle = function (func, delay) {
  let lastTime = Date.now();
  let timer = null;
  return function (...args) {
    const diff = delay - (Date.now() - lastTime);
    const call = () => {
      lastTime = Date.now();
      func.apply(this, ...args);
    };
    // 时间未到，频繁触发
    if (diff > 0) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(call, diff);
    } else {
      call();
    }
  };
};
