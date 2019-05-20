export function mergeSort(list) {
  if (list.length <= 1) {
    return list;
  }
  let left = [];
  let right = [];
  for (let i = 0; i < list.length; i++) {
    if (i < list.length / 2) {
      left.push(list[i]);
    } else {
      right.push(list[i]);
    }
  }
  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left[0]);
      left = left.slice(1);
    } else {
      result.push(right[0]);
      right = right.slice(1);
    }
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
