import { describe, it, expect } from 'vitest';
import {
  buildYoutubeReplyString,
  parseVideoCount,
  needsUpdate,
  buildYoutubeApiUrl,
} from '../src/youtube-utils.js';

describe('buildYoutubeReplyString', () => {
  it('should format a single video correctly', () => {
    const items = [
      { snippet: { title: 'Test Video', resourceId: { videoId: 'abc123' } } },
    ];
    expect(buildYoutubeReplyString(items)).toBe(
      ' 🎥Test Video ➤ https://youtu.be/abc123'
    );
  });

  it('should concatenate multiple videos', () => {
    const items = [
      { snippet: { title: 'Video 1', resourceId: { videoId: 'id1' } } },
      { snippet: { title: 'Video 2', resourceId: { videoId: 'id2' } } },
    ];
    expect(buildYoutubeReplyString(items)).toBe(
      ' 🎥Video 1 ➤ https://youtu.be/id1 🎥Video 2 ➤ https://youtu.be/id2'
    );
  });

  it('should return empty string for empty array', () => {
    expect(buildYoutubeReplyString([])).toBe('');
  });

  it('should handle special characters in titles', () => {
    const items = [
      {
        snippet: {
          title: 'Video <with> "special" & characters',
          resourceId: { videoId: 'xyz' },
        },
      },
    ];
    expect(buildYoutubeReplyString(items)).toBe(
      ' 🎥Video <with> "special" & characters ➤ https://youtu.be/xyz'
    );
  });
});

describe('parseVideoCount', () => {
  it('should parse "1" to 1', () => {
    expect(parseVideoCount('1')).toBe(1);
  });

  it('should parse "5" to 5', () => {
    expect(parseVideoCount('5')).toBe(5);
  });

  it('should parse "3" to 3', () => {
    expect(parseVideoCount('3')).toBe(3);
  });

  it('should default empty string to 1', () => {
    expect(parseVideoCount('')).toBe(1);
  });

  it('should default null to 1', () => {
    expect(parseVideoCount(null)).toBe(1);
  });

  it('should default "abc" to 1 (parseInt returns NaN, || 1)', () => {
    expect(parseVideoCount('abc')).toBe(1);
  });

  it('should default "0" to 1 (parseInt returns 0, || 1)', () => {
    expect(parseVideoCount('0')).toBe(1);
  });

  it('should throw for "6"', () => {
    expect(() => parseVideoCount('6')).toThrow('影片個數不正確');
  });

  it('should throw for "-1"', () => {
    expect(() => parseVideoCount('-1')).toThrow('影片個數不正確');
  });
});

describe('needsUpdate', () => {
  it('should return false when replies are the same', () => {
    expect(needsUpdate('hello', 'hello')).toBe(false);
  });

  it('should return true when replies are different', () => {
    expect(needsUpdate('old reply', 'new reply')).toBe(true);
  });

  it('should return false when new reply is empty', () => {
    expect(needsUpdate('current', '')).toBe(false);
  });

  it('should return false when new reply is null', () => {
    expect(needsUpdate('current', null)).toBe(false);
  });

  it('should return false when new reply is undefined', () => {
    expect(needsUpdate('current', undefined)).toBe(false);
  });

  it('should return true when current is empty but new is not', () => {
    expect(needsUpdate('', 'new reply')).toBe(true);
  });
});

describe('buildYoutubeApiUrl', () => {
  it('should build correct URL with all parameters', () => {
    const url = buildYoutubeApiUrl('API_KEY', 3, 'PLAYLIST_ID');
    expect(url).toBe(
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=3&playlistId=PLAYLIST_ID&key=API_KEY'
    );
  });

  it('should handle maxResults of 1', () => {
    const url = buildYoutubeApiUrl('key123', 1, 'PL_abc');
    expect(url).toBe(
      'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=PL_abc&key=key123'
    );
  });

  it('should handle maxResults of 5', () => {
    const url = buildYoutubeApiUrl('key123', 5, 'PL_abc');
    expect(url).toContain('maxResults=5');
  });
});
