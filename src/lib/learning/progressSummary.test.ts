import { describe, expect, it } from 'vitest';
import {
  parseToolProgress,
  pickResumeTool,
  summarizeProgress,
  type LearningTool,
  type ToolProgressSummary,
} from './progressSummary';

const tool: LearningTool = {
  key: 'demo:progress',
  label: 'Demo',
  href: '/tools/demo',
  totalModules: 10,
};

function persistedBlob(progress: Record<string, unknown>): string {
  return JSON.stringify({ state: { progress }, version: 0 });
}

describe('parseToolProgress', () => {
  it('returns an unstarted summary when no data exists', () => {
    const result = parseToolProgress(tool, null);
    expect(result.started).toBe(false);
    expect(result.percentComplete).toBe(0);
    expect(result.currentModule).toBe(1);
  });

  it('returns an unstarted summary for malformed JSON', () => {
    const result = parseToolProgress(tool, '{not valid json');
    expect(result.started).toBe(false);
  });

  it('computes percent complete from completed modules', () => {
    const raw = persistedBlob({
      completedModules: [1, 2, 3],
      currentModule: 4,
      moduleProgress: {},
      lastVisited: '2026-01-01T00:00:00.000Z',
    });
    const result = parseToolProgress(tool, raw);
    expect(result.completedModules).toBe(3);
    expect(result.percentComplete).toBe(30);
    expect(result.currentModule).toBe(4);
    expect(result.started).toBe(true);
    expect(result.lastVisited).toBe(Date.parse('2026-01-01T00:00:00.000Z'));
  });

  it('treats section-only progress as started', () => {
    const raw = persistedBlob({
      completedModules: [],
      currentModule: 1,
      moduleProgress: { 1: { sectionsCompleted: ['section-1-1'] } },
      lastVisited: '2026-01-02T00:00:00.000Z',
    });
    const result = parseToolProgress(tool, raw);
    expect(result.started).toBe(true);
    expect(result.completedModules).toBe(0);
  });
});

describe('pickResumeTool', () => {
  it('returns null when nothing is started', () => {
    const summaries: ToolProgressSummary[] = summarizeProgress(() => null, [tool]);
    expect(pickResumeTool(summaries)).toBeNull();
  });

  it('picks the most recently visited started tool', () => {
    const read = (key: string): string | null => {
      if (key === 'a:progress') {
        return persistedBlob({ completedModules: [1], currentModule: 2, lastVisited: '2026-01-01T00:00:00.000Z' });
      }
      if (key === 'b:progress') {
        return persistedBlob({ completedModules: [1, 2], currentModule: 3, lastVisited: '2026-02-01T00:00:00.000Z' });
      }
      return null;
    };
    const tools: LearningTool[] = [
      { key: 'a:progress', label: 'A', href: '/a', totalModules: 10 },
      { key: 'b:progress', label: 'B', href: '/b', totalModules: 10 },
    ];
    const resume = pickResumeTool(summarizeProgress(read, tools));
    expect(resume?.key).toBe('b:progress');
  });
});
