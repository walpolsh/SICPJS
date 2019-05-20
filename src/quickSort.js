function swap(a, b) {
  return [b, a];
}

function partition(arr, low, high) {
  let i = low - 1; // index of the smaller element.
  let pivot = arr[high]; // pivot

  for (let j = low; j <= high - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr[i], arr[j]);
    }
  }
  swap(arr[i + 1], arr[high]);

  return i + 1;
}

function quickSort(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
    return arr;
  }
}

let arr = [10, 8, 6, 4, 2, 1];
let arr2 = quickSort(arr, 0, arr.length - 1);
console.log(arr2);
