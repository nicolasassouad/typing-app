import { TypedText, TypingStats, useTypingSession } from './TypingSession';

interface TypingPracticeProps {
  text: string;
}

export function TypingPractice({ text }: TypingPracticeProps) {
  const { state, stats, restart } = useTypingSession([text]);

  return (
    <div className="typing-practice-container">
      <TypingStats stats={stats} onRestart={restart} />
      <TypedText state={state} />
    </div>
  );
}
