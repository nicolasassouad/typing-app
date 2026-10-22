import {
  Stat,
  TypedText,
  TypingStats,
  useTypingSession,
} from './TypingSession';

// TypeScript coding exercises
const CODING_EXERCISES = [
  // Bubble Sort
  `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,

  // Fibonacci
  `function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,

  // Binary Search
  `function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,

  // Graph DFS
  `function dfs(graph: Map<number, number[]>, start: number): number[] {
  const visited: Set<number> = new Set();
  const result: number[] = [];
  function traverse(node: number) {
    if (visited.has(node)) return;
    visited.add(node);
    result.push(node);
    for (const neighbor of graph.get(node) || []) {
      traverse(neighbor);
    }
  }
  traverse(start);
  return result;
}`,

  // Quick Sort
  `function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), ...middle, ...quickSort(right)];
}`,

  // Two Sum
  `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,

  // Reverse Linked List
  `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current = head;
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,

  // Merge Sort
  `function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
];

const EXERCISE_NAMES = [
  'Bubble Sort',
  'Fibonacci',
  'Binary Search',
  'Graph DFS',
  'Quick Sort',
  'Two Sum',
  'Reverse Linked List',
  'Merge Sort',
];

export function CodingPractice() {
  const { state, stats, restart } = useTypingSession(CODING_EXERCISES);

  return (
    <div className="typing-practice-container">
      <TypingStats stats={stats} onRestart={restart}>
        <Stat label="Exercise" value={EXERCISE_NAMES[state.itemIndex]} />
      </TypingStats>
      <TypedText state={state} className="coding-text" />
    </div>
  );
}
