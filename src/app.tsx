import { useState, useEffect } from 'preact/hooks';
import { Keyboard, KeyboardLayout } from './components/Keyboard';
import { TypingPractice } from './components/TypingPractice';
import { TriKeyTyping } from './components/TriKeyTyping';
import { CodingPractice } from './components/CodingPractice';
import { CLIPractice } from './components/CLIPractice';

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export type ExerciseType = 'text' | '3-key' | 'coding' | 'cli';

export function App() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [keyboardLayout, setKeyboardLayout] =
    useState<KeyboardLayout>('qwerty');
  const [exerciseType, setExerciseType] = useState<ExerciseType>('text');

  useEffect(() => {
    const normalizeKey = (key: string): string => {
      // Normalize special keys to match keyboard layout
      const keyMap: Record<string, string> = {
        Backspace: 'backspace',
        Tab: 'tab',
        Enter: 'enter',
        Shift: 'shift',
        Control: 'control',
        Alt: 'alt',
        CapsLock: 'capslock',
        ' ': ' ', // Space
      };

      return keyMap[key] || key.toLowerCase();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = normalizeKey(event.key);
      setPressedKeys((prev) => new Set(prev).add(key));

      // Track Shift key state
      if (event.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = normalizeKey(event.key);
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });

      // Track Shift key state
      if (event.key === 'Shift') {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="component-main-container">
      <div className="exercise-selector">
        <button
          className={`exercise-button ${exerciseType === 'text' ? 'active' : ''}`}
          onClick={() => setExerciseType('text')}
          type="button"
        >
          Text
        </button>
        <button
          className={`exercise-button ${exerciseType === '3-key' ? 'active' : ''}`}
          onClick={() => setExerciseType('3-key')}
          type="button"
        >
          3 Keys
        </button>
        <button
          className={`exercise-button ${exerciseType === 'coding' ? 'active' : ''}`}
          onClick={() => setExerciseType('coding')}
          type="button"
        >
          Coding
        </button>
        <button
          className={`exercise-button ${exerciseType === 'cli' ? 'active' : ''}`}
          onClick={() => setExerciseType('cli')}
          type="button"
        >
          CLI
        </button>
      </div>
      {exerciseType === 'text' ? (
        <TypingPractice text={LOREM_IPSUM} />
      ) : exerciseType === '3-key' ? (
        <TriKeyTyping />
      ) : exerciseType === 'coding' ? (
        <CodingPractice />
      ) : (
        <CLIPractice />
      )}
      <div className="keyboard-section">
        <Keyboard
          pressedKeys={pressedKeys}
          isShiftPressed={isShiftPressed}
          layout={keyboardLayout}
        />
        <div className="layout-selector">
          <button
            className={`layout-button ${keyboardLayout === 'qwerty' ? 'active' : ''}`}
            onClick={() => setKeyboardLayout('qwerty')}
            type="button"
          >
            QWERTY
          </button>
          <button
            className={`layout-button ${keyboardLayout === 'azerty' ? 'active' : ''}`}
            onClick={() => setKeyboardLayout('azerty')}
            type="button"
          >
            AZERTY
          </button>
        </div>
      </div>
    </div>
  );
}
