import type { ComponentChildren } from 'preact';
import { useEffect, useReducer, useRef, useState } from 'preact/hooks';
import {
  CharStatus,
  SessionState,
  initSession,
  sessionReducer,
  sessionStats,
} from '../typingSession';

type Stats = ReturnType<typeof sessionStats>;

export function useTypingSession(items: string[]) {
  const [state, dispatch] = useReducer(sessionReducer, items, initSession);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore modifiers, navigation/function keys and shortcuts like Cmd+R (AltGr reports ctrlKey on Windows)
      if (
        (event.ctrlKey && !event.getModifierState('AltGraph')) ||
        event.metaKey ||
        (event.key.length !== 1 &&
          event.key !== 'Backspace' &&
          event.key !== 'Enter')
      ) {
        return;
      }
      // Stop Space scrolling, Tab moving focus, ' and / opening Firefox quick find
      event.preventDefault();
      dispatch({ type: 'key', key: event.key, now: Date.now() });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isRunning = state.startTime !== null && state.endTime === null;
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const time = Date.now();
      setNow(time);
      dispatch({ type: 'tick', now: time });
    }, 100);
    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    state,
    stats: sessionStats(state, now),
    restart: () => dispatch({ type: 'restart' }),
  };
}

export function Stat({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="stat-item">
      <span className="component-text-s">{label}: </span>
      <strong className="component-text-m">{value}</strong>
    </div>
  );
}

export function TypingStats({
  stats,
  onRestart,
  children,
}: {
  stats: Stats;
  onRestart: () => void;
  children?: ComponentChildren;
}) {
  const { timeRemaining, wpm, kpm, accuracy } = stats;
  return (
    <div className="typing-stats">
      <Stat
        label="Time"
        value={`${Math.floor(timeRemaining / 60)}:${(timeRemaining % 60).toString().padStart(2, '0')}`}
      />
      <Stat label="WPM" value={wpm} />
      <Stat label="KPM" value={kpm} />
      <Stat label="Accuracy" value={`${accuracy}%`} />
      {children}
      <button
        className="exercise-button restart-button"
        onClick={onRestart}
        type="button"
      >
        Restart
      </button>
    </div>
  );
}

const STATUS_CLASS: Record<CharStatus, string | undefined> = {
  pending: undefined,
  correct: 'typed-correct',
  error: 'typed-error',
};

export function TypedText({
  state,
  className = '',
  children,
}: {
  state: SessionState;
  className?: string;
  children?: ComponentChildren;
}) {
  const cursorRef = useRef<HTMLSpanElement>(null);
  const text = state.items[state.itemIndex];

  useEffect(() => {
    cursorRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [state.index, state.itemIndex]);

  return (
    <div className={`typing-text component-card ${className}`}>
      {text.split('').map((char, index) =>
        index === state.index ? (
          <span key={index} ref={cursorRef} className="typing-cursor">
            {char}
          </span>
        ) : (
          <span key={index} className={STATUS_CLASS[state.statuses[index]]}>
            {char}
          </span>
        )
      )}
      {children}
    </div>
  );
}
