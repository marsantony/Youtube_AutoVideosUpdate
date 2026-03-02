/**
 * Build a formatted reply string from YouTube video items.
 * @param {Array<{snippet: {title: string, resourceId: {videoId: string}}}>} items
 * @returns {string} Formatted reply like " 🎥Title ➤ https://youtu.be/ID"
 */
export function buildYoutubeReplyString(items) {
  return items.map(item =>
    ` 🎥${item.snippet.title} ➤ https://youtu.be/${item.snippet.resourceId.videoId}`
  ).join('');
}

/**
 * Validate and parse video count from user input.
 * @param {string} value - Raw input value
 * @returns {number} Parsed count (1-5)
 * @throws {Error} If count is invalid
 */
export function parseVideoCount(value) {
  const count = parseInt(value, 10) || 1;
  if (count <= 0 || count > 5) {
    throw new Error(`影片個數不正確:${count}`);
  }
  return count;
}

/**
 * Check if the command reply needs updating.
 * @param {string} currentReply - Current command reply text
 * @param {string} newReply - New reply text from YouTube
 * @returns {boolean} True if update is needed
 */
export function needsUpdate(currentReply, newReply) {
  if (!newReply) return false;
  return currentReply !== newReply;
}

/**
 * Build YouTube API URL for playlist items.
 * @param {string} apiKey - YouTube Data API key
 * @param {number} maxResults - Number of results (1-5)
 * @param {string} playlistId - YouTube playlist ID
 * @returns {string} Full API URL
 */
export function buildYoutubeApiUrl(apiKey, maxResults, playlistId) {
  return `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;
}
