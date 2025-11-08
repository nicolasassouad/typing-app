import { useState, useEffect, useRef } from 'preact/hooks';

interface TypingPracticeProps {
  text: string;
  onKeyPress?: (key: string) => void;
}

interface CharacterState {
  char: string;
  typed: boolean;
  correct: boolean;
}

export function TypingPractice({ text, onKeyPress }: TypingPracticeProps) {
  const [characters, setCharacters] = useState<CharacterState[]>(() =>
    text.split('').map((char) => ({ char, typed: false, correct: false }))
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [kpm, setKpm] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Use refs to access latest values in event handler
  const currentIndexRef = useRef(0);
  const charactersRef = useRef<CharacterState[]>(characters);
  const startTimeRef = useRef<number | null>(null);

  // Re-initialize when text changes
  useEffect(() => {
    const newCharacters = text.split('').map((char) => ({
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
    currentIndexRef.current = 0;
    charactersRef.current = newCharacters;
    startTimeRef.current = null;
  }, [text]);

  // Keep refs in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    charactersRef.current = characters;
  }, [characters]);

  useEffect(() => {
    startTimeRef.current = startTime;
  }, [startTime]);

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

        setCurrentIndex(currentIdx + 1);
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
      </div>
      <div ref={textRef} className="typing-text component-card">
        {renderText()}
      </div>
    </div>
  );
}
