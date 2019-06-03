export function mergeSort(list, left = [], right = []) {
  if (list.length <= 1) {
    return list;
  }
  list.forEach((_, i) =>
    i < list.length / 2 ? left.push(list[i]) : right.push(list[i])
  );
  return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right, result = []) {
  while (left.length && right.length) {
    left[0] <= right[0]
      ? (result.push(left[0]), (left = left.slice(1)))
      : (result.push(right[0]), (right = right.slice(1)));
  }
  while (left.length) {
    result.push(left[0]);
    left = left.slice(1);
  }
  while (right.length) {
    result.push(right[0]);
    right = right.slice(1);
  }
  return result;
}
