interface KeyboardProps {
  pressedKeys: Set<string>;
}

interface KeyConfig {
  label: string;
  key: string;
  className?: string;
}

const KEYBOARD_LAYOUT: KeyConfig[][] = [
  [
    { label: '`', key: '`' },
    { label: '1', key: '1' },
    { label: '2', key: '2' },
    { label: '3', key: '3' },
    { label: '4', key: '4' },
    { label: '5', key: '5' },
    { label: '6', key: '6' },
    { label: '7', key: '7' },
    { label: '8', key: '8' },
    { label: '9', key: '9' },
    { label: '0', key: '0' },
    { label: '-', key: '-' },
    { label: '=', key: '=' },
    { label: 'Backspace', key: 'backspace', className: 'extra-wide' },
  ],
  [
    { label: 'Tab', key: 'tab', className: 'wide' },
    { label: 'Q', key: 'q' },
    { label: 'W', key: 'w' },
    { label: 'E', key: 'e' },
    { label: 'R', key: 'r' },
    { label: 'T', key: 't' },
    { label: 'Y', key: 'y' },
    { label: 'U', key: 'u' },
    { label: 'I', key: 'i' },
    { label: 'O', key: 'o' },
    { label: 'P', key: 'p' },
    { label: '[', key: '[' },
    { label: ']', key: ']' },
    { label: '\\', key: '\\', className: 'wide' },
  ],
  [
    { label: 'Caps', key: 'capslock', className: 'wide' },
    { label: 'A', key: 'a' },
    { label: 'S', key: 's' },
    { label: 'D', key: 'd' },
    { label: 'F', key: 'f' },
    { label: 'G', key: 'g' },
    { label: 'H', key: 'h' },
    { label: 'J', key: 'j' },
    { label: 'K', key: 'k' },
    { label: 'L', key: 'l' },
    { label: ';', key: ';' },
    { label: "'", key: "'" },
    { label: 'Enter', key: 'enter', className: 'extra-wide' },
  ],
  [
    { label: 'Shift', key: 'shift', className: 'extra-wide' },
    { label: 'Z', key: 'z' },
    { label: 'X', key: 'x' },
    { label: 'C', key: 'c' },
    { label: 'V', key: 'v' },
    { label: 'B', key: 'b' },
    { label: 'N', key: 'n' },
    { label: 'M', key: 'm' },
    { label: ',', key: ',' },
    { label: '.', key: '.' },
    { label: '/', key: '/' },
    { label: 'Shift', key: 'shift', className: 'extra-wide' },
  ],
  [
    { label: 'Ctrl', key: 'control', className: 'wide' },
    { label: 'Alt', key: 'alt', className: 'wide' },
    { label: 'Space', key: ' ', className: 'space' },
    { label: 'Alt', key: 'alt', className: 'wide' },
    { label: 'Ctrl', key: 'control', className: 'wide' },
  ],
];

export function Keyboard({ pressedKeys }: KeyboardProps) {
  const isKeyPressed = (key: string): boolean => {
    return pressedKeys.has(key.toLowerCase());
  };

  return (
    <div className="keyboard-container">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((keyConfig, keyIndex) => {
            const isActive = isKeyPressed(keyConfig.key);
            const keyClasses = ['key', keyConfig.className, isActive ? 'active' : '']
              .filter(Boolean)
              .join(' ');

            return (
              <div key={keyIndex} className={keyClasses}>
                {keyConfig.label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
