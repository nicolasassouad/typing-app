import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SESSION_MS,
  initSession,
  sessionReducer,
  sessionStats,
  type SessionState,
} from '../src/typingSession.ts';

const type = (state: SessionState, keys: string[], now = 1000) =>
  keys.reduce((s, key) => sessionReducer(s, { type: 'key', key, now }), state);

test('typing marks chars and counts errors without undoing them', () => {
  let s = type(initSession(['abc']), ['a', 'x']);
  assert.deepEqual(s.statuses, ['correct', 'error', 'pending']);
  s = type(s, ['Backspace', 'b']);
  assert.deepEqual(s.statuses, ['correct', 'correct', 'pending']);
  assert.equal(s.errorCount, 1);
  assert.equal(s.keystrokes, 4);
  assert.equal(sessionStats(s, 1000).accuracy, 67);
});

test('single text ends the session when finished', () => {
  const s = type(initSession(['ab']), ['a', 'b', 'c']);
  assert.equal(s.endTime, 1000);
  assert.equal(s.charKeystrokes, 2);
});

test('lists advance and loop without resetting the session', () => {
  const s = type(initSession(['ab', 'c']), ['a', 'b', 'c', 'a']);
  assert.equal(s.itemIndex, 0);
  assert.equal(s.completedCount, 2);
  assert.equal(s.completedChars, 3);
  assert.equal(s.startTime, 1000);
});

test('indentation is skipped, including after backspacing into it', () => {
  let s = type(initSession(['a\n  b']), ['a', 'Enter']);
  assert.equal(s.index, 4);
  s = type(s, ['Backspace', 'b']);
  assert.equal(s.endTime, 1000);
  assert.equal(s.errorCount, 0);
});

test('Enter is ignored where no line break is expected', () => {
  const s = type(initSession(['ab']), ['Enter']);
  assert.equal(s.index, 0);
  assert.equal(s.keystrokes, 0);
});

test('time runs out and freezes stats', () => {
  let s = type(initSession(['abcdef']), ['a']);
  s = sessionReducer(s, { type: 'tick', now: 1000 + SESSION_MS });
  assert.equal(s.endTime, 1000 + SESSION_MS);
  assert.equal(type(s, ['b']).index, 1);
  assert.equal(sessionStats(s, 1e12).timeRemaining, 0);
  s = sessionReducer(s, { type: 'restart' });
  assert.equal(s.startTime, null);
  assert.equal(s.index, 0);
});
