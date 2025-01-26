export const calculateReadTime = (content:string, options = {}) => {
    // Default options
    const defaults = {
      wordsPerMinute: 200,        // Average reading speed
      imageReadTime: 12,          // Seconds per image
      codeBlockMultiplier: 1.5    // Code takes longer to read
    };
  
    const settings = { ...defaults, ...options };
  
    // Count words (excluding code blocks)
    const stripCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
    const wordCount = stripCodeBlocks.trim().split(/\s+/).length;
  
    // Count images
    const imageCount = (content.match(/!\[.*?\]\(.*?\)/g) || []).length;
  
    // Count code blocks
    const codeBlockCount = (content.match(/```[\s\S]*?```/g) || []).length;
    const codeBlockWords = content
      .match(/```[\s\S]*?```/g)?.join(' ')
      .split(/\s+/).length || 0;
  
    // Calculate total read time in minutes
    let totalMinutes = 
      // Regular words
      wordCount / settings.wordsPerMinute +
      // Images
      (imageCount * settings.imageReadTime) / 60 +
      // Code blocks (applying multiplier)
      (codeBlockWords / settings.wordsPerMinute * settings.codeBlockMultiplier);
  
    // Round to nearest minute, with a minimum of 1 minute
    const minutes = Math.max(1, Math.round(totalMinutes));
  
    return {
      minutes,
      words: wordCount + codeBlockWords,
      images: imageCount,
      codeBlocks: codeBlockCount,
      detailed: {
        totalMinutes,
        wordCount,
        codeBlockWords,
        imageCount,
        codeBlockCount
      }
    };
  };