import { useState } from 'preact/hooks';
import { Language, TEXTS } from '../texts';
import { TypedText, TypingStats, useTypingSession } from './TypingSession';

const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'fr', label: 'Français' },
];

export function TypingPractice() {
  const [language, setLanguage] = useState<Language>('en');
  const [textIndex, setTextIndex] = useState(0);
  const { text, author } = TEXTS[language][textIndex];

  return (
    <div className="typing-practice-container">
      <div className="text-selector">
        {LANGUAGES.map(({ value, label }) => (
          <button
            key={value}
            className={`exercise-button ${language === value ? 'active' : ''}`}
            onClick={() => {
              setLanguage(value);
              setTextIndex(0);
            }}
            type="button"
          >
            {label}
          </button>
        ))}
        <select
          className="exercise-button text-select"
          value={textIndex}
          onChange={(event) => {
            setTextIndex(Number(event.currentTarget.value));
            // Arrow keys on a focused select would switch texts mid-exercise
            event.currentTarget.blur();
          }}
        >
          {TEXTS[language].map(({ title }, index) => (
            <option key={title} value={index}>
              {title}
            </option>
          ))}
        </select>
        <span className="component-text-s">{author}</span>
      </div>
      {/* key remounts the session so a new text starts fresh */}
      <TextSession key={`${language}-${textIndex}`} text={text} />
    </div>
  );
}

function TextSession({ text }: { text: string }) {
  const { state, stats, restart } = useTypingSession([text]);

  return (
    <>
      <TypingStats stats={stats} onRestart={restart} />
      <TypedText state={state} />
    </>
  );
}
