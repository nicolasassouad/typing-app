import { useState, useEffect } from 'preact/hooks';
import { Keyboard } from './components/Keyboard';
import { TypingPractice } from './components/TypingPractice';

const LOREM_IPSUM = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export function App() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());

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
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = normalizeKey(event.key);
      setPressedKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
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
      <h1 className="component-text-xxl">Typing App</h1>
      <TypingPractice text={LOREM_IPSUM} />
      <Keyboard pressedKeys={pressedKeys} />
    </div>
  );
}
