const deepCopy = (target) => {
  if (typeof target !== "object" || target === null) {
    return target;
  }

  const copy = Array.isArray(target) ? [] : {};

  for (let key in target) {
    if (Array.isArray(target[key])) {
      target[key].map((item) => deepCopy(item));
    }
    const value = target[key];

    copy[key] = deepCopy(value);
  }

  return copy;
};
