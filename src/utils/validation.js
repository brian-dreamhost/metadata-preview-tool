export const LIMITS = {
  title: {
    min: 30,
    optimalMin: 50,
    optimalMax: 60,
    max: 60,
    pixelMax: 580, // desktop
  },
  description: {
    min: 70,
    optimalMin: 150,
    optimalMax: 160,
    max: 160,
    pixelMax: 920,
  },
  ogTitle: {
    optimalMin: 60,
    optimalMax: 90,
    max: 90,
  },
  ogDescription: {
    max: 200,
  },
};

/**
 * Returns the status of a character count relative to its limits.
 * @param {number} length - Current character count
 * @param {object} limits - { min?, optimalMin?, optimalMax?, max }
 * @returns {'empty' | 'short' | 'optimal' | 'warning' | 'over'}
 */
export function getCharacterStatus(length, limits) {
  if (length === 0) return 'empty';
  if (limits.min && length < limits.min) return 'short';
  if (limits.optimalMin && limits.optimalMax) {
    if (length >= limits.optimalMin && length <= limits.optimalMax) return 'optimal';
  }
  if (limits.max && length > limits.max) return 'over';
  if (limits.optimalMax && length > limits.optimalMax) return 'warning';
  if (limits.optimalMin && length < limits.optimalMin) return 'warning';
  return 'optimal';
}

/**
 * Maps status to a Tailwind color class.
 */
export function getStatusColor(status) {
  switch (status) {
    case 'optimal': return 'text-turtle';
    case 'warning': return 'text-tangerine';
    case 'over': return 'text-coral';
    case 'short': return 'text-tangerine';
    default: return 'text-galactic';
  }
}

/**
 * Maps status to a Tailwind background color for the progress bar.
 */
export function getStatusBarColor(status) {
  switch (status) {
    case 'optimal': return 'bg-turtle';
    case 'warning': return 'bg-tangerine';
    case 'over': return 'bg-coral';
    case 'short': return 'bg-tangerine';
    default: return 'bg-galactic';
  }
}
