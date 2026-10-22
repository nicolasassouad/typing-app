import { useState, useEffect } from 'preact/hooks';
import { Keyboard, KeyboardLayout } from './components/Keyboard';
import { TypingPractice } from './components/TypingPractice';
import { TriKeyTyping } from './components/TriKeyTyping';
import { CodingPractice } from './components/CodingPractice';
import { CLIPractice } from './components/CLIPractice';

export type ExerciseType = 'text' | '3-key' | 'coding' | 'cli';

export function App() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [isShiftPressed, setIsShiftPressed] = useState(false);
  const [keyboardLayout, setKeyboardLayout] =
    useState<KeyboardLayout>('qwerty');
  const [exerciseType, setExerciseType] = useState<ExerciseType>('text');

  useEffect(() => {
    // Use the physical key (event.code) so Shift+1 and AZERTY keys map to the
    // same on-screen key on press and release. Layout keys are QWERTY positions.
    const normalizeKey = (code: string): string => {
      const codeMap: Record<string, string> = {
        Backquote: '`',
        Minus: '-',
        Equal: '=',
        BracketLeft: '[',
        BracketRight: ']',
        Backslash: '\\',
        Semicolon: ';',
        Quote: "'",
        Comma: ',',
        Period: '.',
        Slash: '/',
        Space: ' ',
        Backspace: 'backspace',
        Tab: 'tab',
        Enter: 'enter',
        ShiftLeft: 'shift',
        ShiftRight: 'shift',
        ControlLeft: 'control',
        ControlRight: 'control',
        AltLeft: 'alt',
        AltRight: 'alt',
        CapsLock: 'capslock',
      };

      return codeMap[code] ?? code.replace(/^(Key|Digit)/, '').toLowerCase();
    };

    // Keyup is lost when the window loses focus (Cmd+Tab), so clear everything
    const handleBlur = () => {
      setPressedKeys(new Set());
      setIsShiftPressed(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = normalizeKey(event.code);
      setPressedKeys((prev) => new Set(prev).add(key));

      // Track Shift key state
      if (event.key === 'Shift') {
        setIsShiftPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = normalizeKey(event.code);
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
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
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
        <TypingPractice />
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
