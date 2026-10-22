import {
  Stat,
  TypedText,
  TypingStats,
  useTypingSession,
} from './TypingSession';

// 20 most common three-letter combinations in English
const TRI_KEY_COMBINATIONS = [
  'the', // most common word
  'and', // second most common
  'ing', // common suffix
  'ion', // common suffix
  'ent', // common suffix
  'ere', // common pattern
  'her', // common word
  'ate', // common suffix
  'ver', // common pattern
  'ter', // common pattern
  'tha', // common pattern (part of "that", "than", etc.)
  'hat', // common pattern
  'for', // common word
  'are', // common word
  'you', // common word
  'all', // common word
  'can', // common word
  'had', // common word
  'was', // common word
  'one', // common word
];

export function TriKeyTyping() {
  const { state, stats, restart } = useTypingSession(TRI_KEY_COMBINATIONS);

  return (
    <div className="typing-practice-container">
      <TypingStats stats={stats} onRestart={restart}>
        <Stat label="Completed" value={state.completedCount} />
      </TypingStats>
      <TypedText state={state} className="three-key-text">
        {[1, 2].map((offset) => (
          <span key={offset} className="next-pattern-inline">
            {
              TRI_KEY_COMBINATIONS[
                (state.itemIndex + offset) % TRI_KEY_COMBINATIONS.length
              ]
            }
          </span>
        ))}
      </TypedText>
      <div className="three-key-info component-text-s">
        Practice three-letter combinations. Type each combination and it will
        automatically move to the next.
      </div>
    </div>
  );
}
