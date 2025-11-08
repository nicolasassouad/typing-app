export type KeyboardLayout = 'qwerty' | 'azerty';

interface KeyboardProps {
  pressedKeys: Set<string>;
  isShiftPressed: boolean;
  layout?: KeyboardLayout;
}

interface KeyConfig {
  label: string;
  labelShifted?: string;
  key: string;
  className?: string;
}

const QWERTY_LAYOUT: KeyConfig[][] = [
  [
    { label: '`', labelShifted: '~', key: '`' },
    { label: '1', labelShifted: '!', key: '1' },
    { label: '2', labelShifted: '@', key: '2' },
    { label: '3', labelShifted: '#', key: '3' },
    { label: '4', labelShifted: '$', key: '4' },
    { label: '5', labelShifted: '%', key: '5' },
    { label: '6', labelShifted: '^', key: '6' },
    { label: '7', labelShifted: '&', key: '7' },
    { label: '8', labelShifted: '*', key: '8' },
    { label: '9', labelShifted: '(', key: '9' },
    { label: '0', labelShifted: ')', key: '0' },
    { label: '-', labelShifted: '_', key: '-' },
    { label: '=', labelShifted: '+', key: '=' },
    { label: 'Backspace', key: 'backspace', className: 'extra-wide' },
  ],
  [
    { label: 'Tab', key: 'tab', className: 'wide' },
    { label: 'q', labelShifted: 'Q', key: 'q' },
    { label: 'w', labelShifted: 'W', key: 'w' },
    { label: 'e', labelShifted: 'E', key: 'e' },
    { label: 'r', labelShifted: 'R', key: 'r' },
    { label: 't', labelShifted: 'T', key: 't' },
    { label: 'y', labelShifted: 'Y', key: 'y' },
    { label: 'u', labelShifted: 'U', key: 'u' },
    { label: 'i', labelShifted: 'I', key: 'i' },
    { label: 'o', labelShifted: 'O', key: 'o' },
    { label: 'p', labelShifted: 'P', key: 'p' },
    { label: '[', labelShifted: '{', key: '[' },
    { label: ']', labelShifted: '}', key: ']' },
    { label: '\\', labelShifted: '|', key: '\\', className: 'wide' },
  ],
  [
    { label: 'Caps', key: 'capslock', className: 'wide' },
    { label: 'a', labelShifted: 'A', key: 'a' },
    { label: 's', labelShifted: 'S', key: 's' },
    { label: 'd', labelShifted: 'D', key: 'd' },
    { label: 'f', labelShifted: 'F', key: 'f' },
    { label: 'g', labelShifted: 'G', key: 'g' },
    { label: 'h', labelShifted: 'H', key: 'h' },
    { label: 'j', labelShifted: 'J', key: 'j' },
    { label: 'k', labelShifted: 'K', key: 'k' },
    { label: 'l', labelShifted: 'L', key: 'l' },
    { label: ';', labelShifted: ':', key: ';' },
    { label: "'", labelShifted: '"', key: "'" },
    { label: 'Enter', key: 'enter', className: 'extra-wide' },
  ],
  [
    { label: 'Shift', key: 'shift', className: 'extra-wide' },
    { label: 'z', labelShifted: 'Z', key: 'z' },
    { label: 'x', labelShifted: 'X', key: 'x' },
    { label: 'c', labelShifted: 'C', key: 'c' },
    { label: 'v', labelShifted: 'V', key: 'v' },
    { label: 'b', labelShifted: 'B', key: 'b' },
    { label: 'n', labelShifted: 'N', key: 'n' },
    { label: 'm', labelShifted: 'M', key: 'm' },
    { label: ',', labelShifted: '<', key: ',' },
    { label: '.', labelShifted: '>', key: '.' },
    { label: '/', labelShifted: '?', key: '/' },
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

const AZERTY_LAYOUT: KeyConfig[][] = [
  [
    { label: '²', labelShifted: '~', key: '`' },
    { label: '&', labelShifted: '1', key: '1' },
    { label: 'é', labelShifted: '2', key: '2' },
    { label: '"', labelShifted: '3', key: '3' },
    { label: "'", labelShifted: '4', key: '4' },
    { label: '(', labelShifted: '5', key: '5' },
    { label: '-', labelShifted: '6', key: '6' },
    { label: 'è', labelShifted: '7', key: '7' },
    { label: '_', labelShifted: '8', key: '8' },
    { label: 'ç', labelShifted: '9', key: '9' },
    { label: 'à', labelShifted: '0', key: '0' },
    { label: ')', labelShifted: '°', key: '-' },
    { label: '=', labelShifted: '+', key: '=' },
    { label: 'Backspace', key: 'backspace', className: 'extra-wide' },
  ],
  [
    { label: 'Tab', key: 'tab', className: 'wide' },
    { label: 'a', labelShifted: 'A', key: 'a' },
    { label: 'z', labelShifted: 'Z', key: 'z' },
    { label: 'e', labelShifted: 'E', key: 'e' },
    { label: 'r', labelShifted: 'R', key: 'r' },
    { label: 't', labelShifted: 'T', key: 't' },
    { label: 'y', labelShifted: 'Y', key: 'y' },
    { label: 'u', labelShifted: 'U', key: 'u' },
    { label: 'i', labelShifted: 'I', key: 'i' },
    { label: 'o', labelShifted: 'O', key: 'o' },
    { label: 'p', labelShifted: 'P', key: 'p' },
    { label: '^', labelShifted: '¨', key: '[' },
    { label: '$', labelShifted: '£', key: ']' },
    { label: '\\', labelShifted: 'µ', key: '\\', className: 'wide' },
  ],
  [
    { label: 'Caps', key: 'capslock', className: 'wide' },
    { label: 'q', labelShifted: 'Q', key: 'q' },
    { label: 's', labelShifted: 'S', key: 's' },
    { label: 'd', labelShifted: 'D', key: 'd' },
    { label: 'f', labelShifted: 'F', key: 'f' },
    { label: 'g', labelShifted: 'G', key: 'g' },
    { label: 'h', labelShifted: 'H', key: 'h' },
    { label: 'j', labelShifted: 'J', key: 'j' },
    { label: 'k', labelShifted: 'K', key: 'k' },
    { label: 'l', labelShifted: 'L', key: 'l' },
    { label: 'm', labelShifted: 'M', key: 'm' },
    { label: 'ù', labelShifted: '%', key: ';' },
    { label: '*', labelShifted: 'µ', key: "'" },
    { label: 'Enter', key: 'enter', className: 'extra-wide' },
  ],
  [
    { label: 'Shift', key: 'shift', className: 'extra-wide' },
    { label: 'w', labelShifted: 'W', key: 'w' },
    { label: 'x', labelShifted: 'X', key: 'x' },
    { label: 'c', labelShifted: 'C', key: 'c' },
    { label: 'v', labelShifted: 'V', key: 'v' },
    { label: 'b', labelShifted: 'B', key: 'b' },
    { label: 'n', labelShifted: 'N', key: 'n' },
    { label: ',', labelShifted: '?', key: ',' },
    { label: ';', labelShifted: '.', key: '.' },
    { label: ':', labelShifted: '/', key: '/' },
    { label: '!', labelShifted: '§', key: '8' },
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

export function Keyboard({
  pressedKeys,
  isShiftPressed,
  layout = 'qwerty',
}: KeyboardProps) {
  const KEYBOARD_LAYOUT = layout === 'azerty' ? AZERTY_LAYOUT : QWERTY_LAYOUT;
  const isKeyPressed = (key: string): boolean => {
    return pressedKeys.has(key.toLowerCase());
  };

  const getKeyLabel = (keyConfig: KeyConfig): string => {
    if (isShiftPressed && keyConfig.labelShifted) {
      return keyConfig.labelShifted;
    }
    return keyConfig.label;
  };

  return (
    <div className="keyboard-container">
      {KEYBOARD_LAYOUT.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
          {row.map((keyConfig, keyIndex) => {
            const isActive = isKeyPressed(keyConfig.key);
            const keyClasses = [
              'key',
              keyConfig.className,
              isActive ? 'active' : '',
            ]
              .filter(Boolean)
              .join(' ');
            const label = getKeyLabel(keyConfig);

            return (
              <div key={keyIndex} className={keyClasses}>
                {label}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
