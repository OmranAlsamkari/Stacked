export const deepCopy = (array) => {
  const newArray = array.map((a) => {
    if (Array.isArray(a)) return [...a];
    return { ...a };
  });
  return newArray;
};

export const actions = {
  w: {
    name: "UP",
    onEeffected: "height",
    index: "i",
    i: -1,
    j: 0,
  },
  s: {
    name: "DOWN",
    onEeffected: "height",
    index: "i",
    i: +1,
    j: 0,
  },
  a: {
    name: "LEFT",
    onEeffected: "width",
    index: "j",
    i: 0,
    j: -1,
  },
  d: {
    name: "RIGHT",
    onEeffected: "width",
    index: "j",
    i: 0,
    j: +1,
  },
};
