function reverseSearch(
  data: string[],
  prefix: string,
  pivot: number,
  result: string[],
  start: number
) {
  for (let i = pivot; i >= start; i--) {
    if (data[i].toLowerCase().startsWith(prefix.toLowerCase())) {
      result.unshift(data[i]);
    } else {
      break;
    }
  }
}

function directSearch(
  data: string[],
  prefix: string,
  pivot: number,
  result: string[],
  end: number
) {
  for (let j = pivot + 1; j <= end; j++) {
    if (data[j].toLowerCase().startsWith(prefix.toLowerCase())) {
      result.push(data[j]);
    } else {
      break;
    }
  }
}

function isContainsPrefix(data: string[], pivot: number, prefix: string) {
  if (data[pivot].toLowerCase().startsWith(prefix.toLowerCase())) {
    return true;
  }
  return false;
}

function autocomplete(data: string[], prefix: string) {
  const dictionary = data;
  let start = 0;
  let end = dictionary.length - 1;
  let isFound = false;
  let middle;
  const result: string[] = [];
  if (!prefix) {
    return result;
  }
  while (isFound === false && start <= end) {
    middle = Math.floor((start + end) / 2);
    if (isContainsPrefix(dictionary, middle, prefix)) {
      reverseSearch(dictionary, prefix, middle, result, start);
      directSearch(dictionary, prefix, middle, result, end);
      isFound = true;
    }

    if (
      dictionary[middle].slice(0, prefix.length).toLowerCase() <
      prefix.toLowerCase()
    ) {
      start = middle + 1;
    } else {
      end = middle - 1;
    }
  }
  return result;
}
export { autocomplete };
