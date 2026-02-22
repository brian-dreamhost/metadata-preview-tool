import { getCharacterStatus, getStatusColor, getStatusBarColor } from '../utils/validation';

export function CharacterCount({ length, limits }) {
  const status = getCharacterStatus(length, limits);
  const colorClass = getStatusColor(status);
  const barColorClass = getStatusBarColor(status);

  const max = limits.max || limits.optimalMax || 100;
  const percentage = Math.min((length / max) * 100, 100);

  const label = (() => {
    if (length === 0) return `0 / ${max}`;
    if (status === 'optimal') return `${length} / ${max} — Optimal`;
    if (status === 'over') return `${length} / ${max} — Over limit`;
    if (status === 'short') return `${length} / ${max} — Too short`;
    if (status === 'warning') return `${length} / ${max} — Approaching limit`;
    return `${length} / ${max}`;
  })();

  return (
    <div className="mt-1.5">
      <div className="h-1 w-full bg-metal/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-200 ${barColorClass}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className={`text-xs mt-1 ${colorClass}`}>{label}</p>
    </div>
  );
}
