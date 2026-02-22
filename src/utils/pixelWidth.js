let canvas = null;

function getContext() {
  if (!canvas) {
    canvas = document.createElement('canvas');
  }
  return canvas.getContext('2d');
}

/**
 * Measures the pixel width of text rendered in a specific font.
 * @param {string} text
 * @param {string} font - CSS font shorthand, e.g. '20px Arial'
 * @returns {number} pixel width
 */
export function measureTextWidth(text, font) {
  const ctx = getContext();
  ctx.font = font;
  return ctx.measureText(text).width;
}

/**
 * Truncates text to fit within a pixel width, appending ellipsis if needed.
 * Uses binary search for efficiency.
 * @param {string} text
 * @param {string} font - CSS font shorthand
 * @param {number} maxWidth - Maximum pixel width
 * @returns {string} Truncated text (with ellipsis if truncated)
 */
export function truncateToPixelWidth(text, font, maxWidth) {
  if (!text) return '';

  const fullWidth = measureTextWidth(text, font);
  if (fullWidth <= maxWidth) return text;

  const ellipsis = '...';
  const ellipsisWidth = measureTextWidth(ellipsis, font);
  const targetWidth = maxWidth - ellipsisWidth;

  // Binary search for the right truncation point
  let low = 0;
  let high = text.length;

  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    const sliced = text.slice(0, mid);
    const width = measureTextWidth(sliced, font);

    if (width <= targetWidth) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return text.slice(0, low) + ellipsis;
}

// Google SERP font specifications
export const GOOGLE_FONTS = {
  desktopTitle: '20px Arial',
  desktopDescription: '14px Arial',
  desktopUrl: '14px Arial',
  mobileTitle: '20px Arial',
  mobileDescription: '14px Arial',
  mobileUrl: '12px Arial',
};

export const GOOGLE_MAX_WIDTHS = {
  desktopTitle: 580,
  desktopDescription: 920,
  mobileTitle: 600,
  mobileDescription: 680,
};
