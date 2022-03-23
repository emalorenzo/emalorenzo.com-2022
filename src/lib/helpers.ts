// split array in two chunks, first one with elements
// that pass the condition function, second one with elements that don't
export function splitArray(array, isValid) {
  if (!Array.isArray(array)) {
    return isValid(array) ? [[array], []] : [[], [array]];
  }
  return array.reduce(
    ([pass, fail], elem) => {
      return isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}
