import { useState, useEffect, useRef } from 'preact/hooks';

interface CLIPracticeProps {
  onKeyPress?: (key: string) => void;
}

interface CharacterState {
  char: string;
  typed: boolean;
  correct: boolean;
}

interface CLICommand {
  command: string;
  description: string;
}

// Common CLI/bash commands
const CLI_COMMANDS: CLICommand[] = [
  {
    command: 'ls -la',
    description: 'List all files and directories with details',
  },
  {
    command: 'cd ~/Documents',
    description: 'Change directory to Documents folder',
  },
  {
    command: 'mkdir myproject',
    description: 'Create a new directory named myproject',
  },
  {
    command: 'rm -rf node_modules',
    description: 'Remove directory and all contents recursively',
  },
  {
    command: 'cp file.txt backup.txt',
    description: 'Copy file.txt to backup.txt',
  },
  {
    command: 'mv old.txt new.txt',
    description: 'Rename or move old.txt to new.txt',
  },
  {
    command: 'grep -r "pattern" .',
    description: 'Search for pattern recursively in current directory',
  },
  {
    command: 'find . -name "*.js"',
    description: 'Find all JavaScript files in current directory',
  },
  { command: 'cat file.txt', description: 'Display contents of file.txt' },
  {
    command: 'head -n 10 file.txt',
    description: 'Display first 10 lines of file.txt',
  },
  {
    command: 'tail -f log.txt',
    description: 'Follow and display log.txt in real-time',
  },
  { command: 'chmod +x script.sh', description: 'Make script.sh executable' },
  {
    command: 'ps aux | grep node',
    description: 'List all processes and filter for node',
  },
  {
    command: 'kill -9 12345',
    description: 'Force kill process with PID 12345',
  },
  {
    command: 'tar -czf archive.tar.gz folder/',
    description: 'Create compressed tar archive of folder',
  },
  {
    command: 'tar -xzf archive.tar.gz',
    description: 'Extract compressed tar archive',
  },
  { command: 'git status', description: 'Show the working tree status' },
  { command: 'git add .', description: 'Stage all changes for commit' },
  {
    command: 'git commit -m "message"',
    description: 'Commit changes with a message',
  },
  {
    command: 'git push origin main',
    description: 'Push commits to main branch on origin',
  },
  {
    command: 'git pull origin main',
    description: 'Fetch and merge from main branch',
  },
  {
    command: 'npm install',
    description: 'Install dependencies from package.json',
  },
  {
    command: 'npm run build',
    description: 'Run build script from package.json',
  },
  { command: 'docker ps', description: 'List running Docker containers' },
  {
    command: 'docker build -t myapp .',
    description: 'Build Docker image from current directory',
  },
  { command: 'ssh user@host', description: 'Connect to remote server via SSH' },
  {
    command: 'scp file.txt user@host:/path',
    description: 'Copy file to remote server via SCP',
  },
];

export function CLIPractice({ onKeyPress }: CLIPracticeProps) {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [characters, setCharacters] = useState<CharacterState[]>(() => {
    const cmd = CLI_COMMANDS[0];
    return cmd.command
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
  const [completedCount, setCompletedCount] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Use refs to access latest values in event handler
  const currentIndexRef = useRef(0);
  const currentCommandIndexRef = useRef(0);
  const charactersRef = useRef<CharacterState[]>(characters);
  const startTimeRef = useRef<number | null>(null);
  const timeRemainingRef = useRef(120);
  const isTimerActiveRef = useRef(false);

  // Keep refs in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    currentCommandIndexRef.current = currentCommandIndex;
  }, [currentCommandIndex]);

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

  // Re-initialize when command changes
  useEffect(() => {
    const cmd = CLI_COMMANDS[currentCommandIndex];
    const newCharacters = cmd.command.split('').map((char) => ({
      char,
      typed: false,
      correct: false,
    }));
    setCharacters(newCharacters);
    setCurrentIndex(0);
    charactersRef.current = newCharacters;
    currentIndexRef.current = 0;

    // Reset timer on first command
    if (currentCommandIndex === 0) {
      setStartTime(null);
      setWpm(0);
      setKpm(0);
      setTotalKeystrokes(0);
      setErrorCount(0);
      setTimeRemaining(120);
      setIsTimerActive(false);
      setCompletedCount(0);
      startTimeRef.current = null;
      timeRemainingRef.current = 120;
      isTimerActiveRef.current = false;
    }
  }, [currentCommandIndex]);

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
      const typedChars = completedCount * 10; // Average command length
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
      const currentCmdIdx = currentCommandIndexRef.current;

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

        // If completed current command, move to next
        if (newIndex >= currentChars.length) {
          setCompletedCount((prev) => prev + 1);
          const nextCmdIndex = (currentCmdIdx + 1) % CLI_COMMANDS.length;
          setCurrentCommandIndex(nextCmdIndex);
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

  const currentCommand = CLI_COMMANDS[currentCommandIndex];

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
          <span className="component-text-s">Completed: </span>
          <strong className="component-text-m">{completedCount}</strong>
        </div>
      </div>
      <div className="cli-description component-text-s">
        {currentCommand.description}
      </div>
      <div ref={textRef} className="typing-text component-card cli-text">
        {renderText()}
      </div>
    </div>
  );
}
