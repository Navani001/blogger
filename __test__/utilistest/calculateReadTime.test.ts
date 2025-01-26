import { calculateReadTime } from '../../src/lib/utilis/calculateReadTime';

describe('calculateReadTime', () => {
  it('should calculate basic reading time for plain text', () => {
    const content = 'This is a test content with ten words in it.';
    const result = calculateReadTime(content);
    
    expect(result.minutes).toBe(1);
    expect(result.words).toBe(10);
    expect(result.images).toBe(0);
    expect(result.codeBlocks).toBe(0);
  });

  it('should count images correctly', () => {
    const content = 'Text with ![image1](url1) and ![image2](url2)';
    const result = calculateReadTime(content);
    
    expect(result.images).toBe(2);
    expect(result.detailed.imageCount).toBe(2);
  });

  it('should handle code blocks with multiplier', () => {
    const content = 'Some text\n```\ncode block\nwith multiple\nlines\n```';
    const result = calculateReadTime(content);
    
    expect(result.codeBlocks).toBe(1);
    expect(result.detailed.codeBlockCount).toBe(1);
  });

  it('should accept custom options', () => {
    const content = 'Short text with ![image](url)';
    const options = { wordsPerMinute: 100, imageReadTime: 20 };
    const result = calculateReadTime(content, options);
    
    expect(result.detailed.totalMinutes).toBeGreaterThan(0);
  });

  it('should handle empty content', () => {
    const result = calculateReadTime('');
    
    expect(result.minutes).toBe(1);

    expect(result.images).toBe(0);
    expect(result.codeBlocks).toBe(0);
  });

  it('should combine words from text and code blocks', () => {
    const content = 'Regular text\n```\ncode words\n```\nmore text';
    const result = calculateReadTime(content);
    
    expect(result.words).toBeGreaterThan(0);
    expect(result.detailed.wordCount).toBeGreaterThan(0);
    expect(result.detailed.codeBlockWords).toBeGreaterThan(0);
  });
});