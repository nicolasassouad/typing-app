import { useState, useEffect, useRef } from 'preact/hooks';

interface TriKeyTypingProps {
  onKeyPress?: (key: string) => void;
}

interface CharacterState {
  char: string;
  typed: boolean;
  correct: boolean;
}

// 20 most common three-letter combinations in English
const TRI_KEY_COMBINATIONS = [
  'the', // most common word
  'and', // second most common
  'ing', // common suffix
  'ion', // common suffix
  'ent', // common suffix
  'ere', // common pattern
  'her', // common word
  'ate', // common suffix
  'ver', // common pattern
  'ter', // common pattern
  'tha', // common pattern (part of "that", "than", etc.)
  'hat', // common pattern
  'for', // common word
  'are', // common word
  'you', // common word
  'all', // common word
  'can', // common word
  'had', // common word
  'was', // common word
  'one', // common word
];

export function TriKeyTyping({ onKeyPress }: TriKeyTypingProps) {
  const [currentCombinationIndex, setCurrentCombinationIndex] = useState(0);
  const [characters, setCharacters] = useState<CharacterState[]>(() => {
    const combo = TRI_KEY_COMBINATIONS[0];
    return combo
      .split('')
      .map((char) => ({ char, typed: false, correct: false }));
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [kpm, setKpm] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Use refs to access latest values in event handler
  const currentIndexRef = useRef(0);
  const currentCombinationIndexRef = useRef(0);
  const charactersRef = useRef<CharacterState[]>(characters);
  const startTimeRef = useRef<number | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    currentCombinationIndexRef.current = currentCombinationIndex;
  }, [currentCombinationIndex]);

  useEffect(() => {
    charactersRef.current = characters;
  }, [characters]);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

  // Initialize or move to next combination
  useEffect(() => {
    const combo = TRI_KEY_COMBINATIONS[currentCombinationIndex];
    const newCharacters = combo.split('').map((char) => ({
      char,
      typed: false,
      correct: false,
    }));
    setCharacters(newCharacters);
    setCurrentIndex(0);
    charactersRef.current = newCharacters;
    currentIndexRef.current = 0;
  }, [currentCombinationIndex]);

  // Scroll cursor into view
  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [currentIndex, currentCombinationIndex]);

  // Calculate WPM and KPM
  useEffect(() => {
    if (startTime === null) return;

    const interval = setInterval(() => {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const typedChars = completedCount * 3; // Each combination is 3 characters
      const wordsTyped = typedChars / 5; // Standard: 5 characters = 1 word

      if (elapsedMinutes > 0) {
        setWpm(Math.round(wordsTyped / elapsedMinutes));
        setKpm(Math.round(totalKeystrokes / elapsedMinutes));
      }
    }, 100);

    return () => clearInterval(interval);
  }, [startTime, completedCount, totalKeystrokes]);

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
      const currentComboIdx = currentCombinationIndexRef.current;

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
      }

      // Handle regular character input
      if (currentIdx < currentChars.length) {
        const expectedChar = currentChars[currentIdx].char;
        const typedChar = event.key;
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

        const newIndex = currentIdx + 1;

        // If completed current combination, move to next
        if (newIndex >= currentChars.length) {
          setCompletedCount((prev) => prev + 1);
          // Move to next combination (useEffect will reset currentIndex to 0)
          const nextComboIndex =
            (currentComboIdx + 1) % TRI_KEY_COMBINATIONS.length;
          setCurrentCombinationIndex(nextComboIndex);
          // Reset currentIndex immediately for the new combination
          setCurrentIndex(0);
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
    const currentPattern = characters.map((charState, index) => {
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

    const nextPatterns = [1, 2].map((offset) => {
      const nextIndex =
        (currentCombinationIndex + offset) % TRI_KEY_COMBINATIONS.length;
      const nextPattern = TRI_KEY_COMBINATIONS[nextIndex];
      return (
        <span key={offset} className="next-pattern-inline">
          {nextPattern}
        </span>
      );
    });

    return (
      <>
        {currentPattern}
        {nextPatterns}
      </>
    );
  };

  return (
    <div className="typing-practice-container">
      <div className="typing-stats">
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
          <span className="component-text-s">Completed: </span>
          <strong className="component-text-m">{completedCount}</strong>
        </div>
      </div>
      <div className="typing-text component-card three-key-text">
        {renderText()}
      </div>
      <div className="three-key-info component-text-s">
        Practice three-letter combinations. Type each combination and it will
        automatically move to the next.
      </div>
    </div>
  );
}
