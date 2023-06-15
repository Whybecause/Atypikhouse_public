export const flatten = (arr) => {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
};


export function getUnique(array, key) {
  if (typeof key !== "function") {
    const property = key;
    key = function (item) { return item[property]; };
  }
  return Array.from(array.reduce(function (map, item) {
    const k = key(item);
    if (!map.has(k)) map.set(k, item);
    return map;
  }, new Map()).values());
}

export function findCommon(arr1, arr2) {
  return arr1.some(item => arr2.includes(item));
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}
