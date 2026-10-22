export const SESSION_MS = 120_000; // 2 minutes

export type CharStatus = 'pending' | 'correct' | 'error';

export interface SessionState {
  items: string[];
  itemIndex: number;
  statuses: CharStatus[];
  index: number;
  startTime: number | null;
  endTime: number | null;
  keystrokes: number;
  charKeystrokes: number;
  errorCount: number;
  completedChars: number;
  completedCount: number;
}

export type SessionAction =
  | { type: 'key'; key: string; now: number }
  | { type: 'tick'; now: number }
  | { type: 'restart' };

const isIndent = (char: string) => char === ' ' || char === '\t';

// Indentation (whitespace between line start and index) is filled in for the user
function skipIndent(text: string, statuses: CharStatus[], index: number) {
  let lineStart = index;
  while (lineStart > 0 && isIndent(text[lineStart - 1])) lineStart--;
  if (lineStart > 0 && text[lineStart - 1] !== '\n') return index;
  while (index < text.length && isIndent(text[index])) {
    statuses[index++] = 'correct';
  }
  return index;
}

function freshItem(text: string) {
  const statuses: CharStatus[] = Array(text.length).fill('pending');
  return { statuses, index: skipIndent(text, statuses, 0) };
}

export function initSession(items: string[]): SessionState {
  return {
    items,
    itemIndex: 0,
    ...freshItem(items[0]),
    startTime: null,
    endTime: null,
    keystrokes: 0,
    charKeystrokes: 0,
    errorCount: 0,
    completedChars: 0,
    completedCount: 0,
  };
}

export function sessionReducer(
  state: SessionState,
  action: SessionAction
): SessionState {
  if (action.type === 'restart') return initSession(state.items);
  if (state.endTime !== null) return state;

  const startTime =
    state.startTime ?? (action.type === 'key' ? action.now : null);
  if (startTime === null) return state;
  if (action.now - startTime >= SESSION_MS) {
    return { ...state, startTime, endTime: startTime + SESSION_MS };
  }
  if (action.type === 'tick') return state;

  const text = state.items[state.itemIndex];
  const statuses = [...state.statuses];
  const keystrokes = state.keystrokes + 1;

  if (action.key === 'Backspace') {
    if (state.index === 0) return { ...state, startTime, keystrokes };
    statuses[state.index - 1] = 'pending';
    return {
      ...state,
      startTime,
      keystrokes,
      statuses,
      index: state.index - 1,
    };
  }

  let index = skipIndent(text, statuses, state.index);
  const typed = action.key === 'Enter' ? '\n' : action.key;
  // Enter only counts where a line break is expected
  if (typed === '\n' && text[index] !== '\n') return state;

  const correct = typed === text[index];
  statuses[index] = correct ? 'correct' : 'error';
  index = skipIndent(text, statuses, index + 1);
  const next = {
    ...state,
    startTime,
    keystrokes,
    statuses,
    index,
    charKeystrokes: state.charKeystrokes + 1,
    errorCount: state.errorCount + (correct ? 0 : 1),
  };
  if (index < text.length) return next;

  // Item done: a single text ends the session, a list moves on (looping)
  const completedCount = state.completedCount + 1;
  if (state.items.length === 1) {
    return { ...next, completedCount, endTime: action.now };
  }
  const itemIndex = (state.itemIndex + 1) % state.items.length;
  return {
    ...next,
    completedCount,
    completedChars: state.completedChars + text.length,
    itemIndex,
    ...freshItem(state.items[itemIndex]),
  };
}

export function sessionStats(state: SessionState, now: number) {
  const elapsed =
    state.startTime === null
      ? 0
      : Math.min(
          SESSION_MS,
          Math.max(0, (state.endTime ?? now) - state.startTime)
        );
  const minutes = elapsed / 60000;
  const perMinute = (count: number) =>
    minutes > 0 ? Math.round(count / minutes) : 0;

  return {
    timeRemaining: Math.ceil((SESSION_MS - elapsed) / 1000),
    // Standard: 5 characters = 1 word
    wpm: perMinute((state.completedChars + state.index) / 5),
    kpm: perMinute(state.keystrokes),
    accuracy:
      state.charKeystrokes === 0
        ? 100
        : Math.round(
            (100 * (state.charKeystrokes - state.errorCount)) /
              state.charKeystrokes
          ),
  };
}
