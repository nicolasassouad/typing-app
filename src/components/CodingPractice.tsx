import { useState, useEffect, useRef } from 'preact/hooks';

interface CodingPracticeProps {
  onKeyPress?: (key: string) => void;
}

interface CharacterState {
  char: string;
  typed: boolean;
  correct: boolean;
}

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

export function CodingPractice({ onKeyPress }: CodingPracticeProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [characters, setCharacters] = useState<CharacterState[]>(() => {
    const exercise = CODING_EXERCISES[0];
    return exercise
      .split('')
      .map((char) => ({ char, typed: false, correct: false }));
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [kpm, setKpm] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Use refs to access latest values in event handler
  const currentIndexRef = useRef(0);
  const currentExerciseIndexRef = useRef(0);
  const charactersRef = useRef<CharacterState[]>(characters);
  const startTimeRef = useRef<number | null>(null);
  const timeRemainingRef = useRef(120);
  const isTimerActiveRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    currentExerciseIndexRef.current = currentExerciseIndex;
  }, [currentExerciseIndex]);

  useEffect(() => {
    charactersRef.current = characters;
  }, [characters]);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  useEffect(() => {
    timeRemainingRef.current = timeRemaining;
  }, [timeRemaining]);

  useEffect(() => {
    isTimerActiveRef.current = isTimerActive;
  }, [isTimerActive]);

  // Re-initialize when exercise changes
  useEffect(() => {
    const exercise = CODING_EXERCISES[currentExerciseIndex];
    const newCharacters = exercise.split('').map((char) => ({
      char,
      typed: false,
      correct: false,
    }));
    setCharacters(newCharacters);
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setKpm(0);
    setTotalKeystrokes(0);
    setErrorCount(0);
    setTimeRemaining(120);
    setIsTimerActive(false);
    currentIndexRef.current = 0;
    charactersRef.current = newCharacters;
    startTimeRef.current = null;
    timeRemainingRef.current = 120;
    isTimerActiveRef.current = false;
  }, [currentExerciseIndex]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive || timeRemaining <= 0) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsTimerActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerActive, timeRemaining]);

  // Scroll cursor into view
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  // Calculate WPM and KPM
  useEffect(() => {
    if (startTime === null) return;

    const interval = setInterval(() => {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const typedChars = characters.filter((c) => c.typed).length;
      const wordsTyped = typedChars / 5; // Standard: 5 characters = 1 word

      if (elapsedMinutes > 0) {
        setWpm(Math.round(wordsTyped / elapsedMinutes));
        setKpm(Math.round(totalKeystrokes / elapsedMinutes));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, characters, totalKeystrokes]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Ignore modifier keys
      if (
        event.key === 'Shift' ||
        event.key === 'Control' ||
        event.key === 'Alt' ||
        event.key === 'Meta' ||
        event.key === 'CapsLock'
      ) {
        return;
      }

      const currentIdx = currentIndexRef.current;
      const currentChars = charactersRef.current;
      const currentStartTime = startTimeRef.current;
      const currentExerciseIdx = currentExerciseIndexRef.current;

      // Handle backspace
      if (event.key === 'Backspace') {
        event.preventDefault();
        if (currentIdx > 0) {
          const newIndex = currentIdx - 1;
          const charToUndo = currentChars[newIndex];

          setCharacters((chars) => {
            const updated = [...chars];
            updated[newIndex] = {
              ...updated[newIndex],
              typed: false,
              correct: false,
            };
            return updated;
          });

          // Decrease error count if we're undoing an error
          if (charToUndo.typed && !charToUndo.correct) {
            setErrorCount((prev) => Math.max(0, prev - 1));
          }

          setCurrentIndex(newIndex);
          setTotalKeystrokes((prev) => prev + 1);
        }
        return;
      }

      // Start timer on first keypress
      if (currentStartTime === null && currentIdx === 0) {
        setStartTime(Date.now());
        setIsTimerActive(true);
        isTimerActiveRef.current = true;
      }

      // Stop if timer reached 0
      if (timeRemainingRef.current <= 0) {
        return;
      }

      // Handle regular character input
      if (currentIdx < currentChars.length) {
        const expectedChar = currentChars[currentIdx].char;
        const typedChar = event.key;
        let newIndex = currentIdx;

        // Handle Enter - mark newline and skip leading whitespace
        if (typedChar === 'Enter' && expectedChar === '\n') {
          // Mark newline as correct
          setCharacters((chars) => {
            const updated = [...chars];
            updated[currentIdx] = {
              char: expectedChar,
              typed: true,
              correct: true,
            };
            return updated;
          });
          newIndex = currentIdx + 1;

          // Skip all leading whitespace (tabs and spaces) after newline
          while (newIndex < currentChars.length) {
            const nextChar = currentChars[newIndex].char;
            if (nextChar === '\t' || nextChar === ' ') {
              setCharacters((chars) => {
                const updated = [...chars];
                updated[newIndex] = {
                  char: nextChar,
                  typed: true,
                  correct: true,
                };
                return updated;
              });
              newIndex++;
            } else {
              break;
            }
          }
        }
        // Skip tabs and spaces automatically - they're for indentation
        else if (expectedChar === '\t' || expectedChar === ' ') {
          // Check if this is leading whitespace (after newline or at start)
          // Look backwards to find the last non-whitespace character
          let isLeadingWhitespace = currentIdx === 0;
          if (!isLeadingWhitespace) {
            for (let i = currentIdx - 1; i >= 0; i--) {
              const char = currentChars[i].char;
              if (char === '\n') {
                isLeadingWhitespace = true;
                break;
              } else if (char !== '\t' && char !== ' ') {
                isLeadingWhitespace = false;
                break;
              }
            }
          }

          if (isLeadingWhitespace) {
            // Mark whitespace as correct and skip it
            setCharacters((chars) => {
              const updated = [...chars];
              updated[currentIdx] = {
                char: expectedChar,
                typed: true,
                correct: true,
              };
              return updated;
            });
            newIndex = currentIdx + 1;

            // Continue skipping tabs and spaces until we hit a non-whitespace character
            while (newIndex < currentChars.length) {
              const nextChar = currentChars[newIndex].char;
              if (nextChar === '\t' || nextChar === ' ') {
                setCharacters((chars) => {
                  const updated = [...chars];
                  updated[newIndex] = {
                    char: nextChar,
                    typed: true,
                    correct: true,
                  };
                  return updated;
                });
                newIndex++;
              } else {
                break;
              }
            }
          } else {
            // Not leading whitespace, treat as normal character
            const isCorrect = typedChar === expectedChar;

            if (!isCorrect) {
              setErrorCount((prev) => prev + 1);
            }

            setCharacters((chars) => {
              const updated = [...chars];
              updated[currentIdx] = {
                char: expectedChar,
                typed: true,
                correct: isCorrect,
              };
              return updated;
            });

            newIndex = currentIdx + 1;
          }
        }
        // Normal character comparison
        else {
          const isCorrect = typedChar === expectedChar;

          // Increment error count if incorrect
          if (!isCorrect) {
            setErrorCount((prev) => prev + 1);
          }

          setCharacters((chars) => {
            const updated = [...chars];
            updated[currentIdx] = {
              char: expectedChar,
              typed: true,
              correct: isCorrect,
            };
            return updated;
          });

          newIndex = currentIdx + 1;
        }

        // If completed current exercise, move to next
        if (newIndex >= currentChars.length) {
          const nextExerciseIndex =
            (currentExerciseIdx + 1) % CODING_EXERCISES.length;
          setCurrentExerciseIndex(nextExerciseIndex);
        } else {
          setCurrentIndex(newIndex);
        }

        setTotalKeystrokes((prev) => prev + 1);

        if (onKeyPress) {
          onKeyPress(typedChar);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onKeyPress]);

  const renderText = () => {
    return characters.map((charState, index) => {
      if (index === currentIndex) {
        return (
          <span key={index} ref={cursorRef} className="typing-cursor">
            {charState.char}
          </span>
        );
      }

      if (charState.typed) {
        const className = charState.correct ? 'typed-correct' : 'typed-error';
        return (
          <span key={index} className={className}>
            {charState.char}
          </span>
        );
      }

      return <span key={index}>{charState.char}</span>;
    });
  };

  const getExerciseName = () => {
    const names = [
      'Bubble Sort',
      'Fibonacci',
      'Binary Search',
      'Graph DFS',
      'Quick Sort',
      'Two Sum',
      'Reverse Linked List',
      'Merge Sort',
    ];
    return names[currentExerciseIndex];
  };

  return (
    <div className="typing-practice-container">
      <div className="typing-stats">
        <div className="stat-item">
          <span className="component-text-s">Time: </span>
          <strong className="component-text-m">
            {Math.floor(timeRemaining / 60)}:
            {(timeRemaining % 60).toString().padStart(2, '0')}
          </strong>
        </div>
        <div className="stat-item">
          <span className="component-text-s">WPM: </span>
          <strong className="component-text-m">{wpm}</strong>
        </div>
        <div className="stat-item">
          <span className="component-text-s">KPM: </span>
          <strong className="component-text-m">{kpm}</strong>
        </div>
        <div className="stat-item">
          <span className="component-text-s">Errors: </span>
          <strong className="component-text-m">{errorCount}</strong>
        </div>
        <div className="stat-item">
          <span className="component-text-s">Exercise: </span>
          <strong className="component-text-m">{getExerciseName()}</strong>
        </div>
      </div>
      <div ref={textRef} className="typing-text component-card coding-text">
        {renderText()}
      </div>
    </div>
  );
}
