// partition function similar to quick sort
// Considers last element as pivot and adds
// elements with less value to the left and
// high value to the right and also changes
// the pivot position to its respective position
// in the final array.
function _partition(arr, low, high) {
  let pivot = arr[high], pivotloc = low;
  for (let i = low; i <= high; i++) {

    // inserting elements of less value
    // to the left of the pivot location
    if (arr[i] < pivot) {
      let temp = arr[i];
      arr[i] = arr[pivotloc];
      arr[pivotloc] = temp;
      pivotloc++;
    }
  }

  // swapping pivot to the final pivot location
  let temp = arr[high];
  arr[high] = arr[pivotloc];
  arr[pivotloc] = temp;

  return pivotloc;
}

// finds the kth position (of the sorted array)
// in a given unsorted array i.e this function
// can be used to find both kth largest and
// kth smallest element in the array.
// ASSUMPTION: all elements in arr[] are distinct
function kthSmallest(arr, low, high, k) {

  // find the partition
  let partition = _partition(arr, low, high);

  // if partition value is equal to the kth position,
  // return value at k.
  if (partition == k - 1)
    return arr[partition];

  // if partition value is less than kth position,
  // search right side of the array.
  else if (partition < k - 1)
    return kthSmallest(arr, partition + 1, high, k);

  // if partition value is more than kth position,
  // search left side of the array.
  else
    return kthSmallest(arr, low, partition - 1, k);
}


function findKthLargest(nums, k) {
  return quickSelect(nums, k);
}

function quickSelect(nums, k) {
  const pivotIndex = Math.floor(Math.random() * nums.length);
  const pivot = nums[pivotIndex];

  let left = [];
  let mid = [];
  let right = [];

  for (const num in nums) {
    if (num > pivot) {
      left.push(num);
    } else if (num < pivot) {
      right.push(num);
    } else {
      mid.push(num);
    }
  }

  if (k <= left.length) {
    return quickSelect(left, k);
  }

  if (left.length + mid.length < k) {
    return quickSelect(right, k - left.length - mid.length);
  }

  return pivot;
}