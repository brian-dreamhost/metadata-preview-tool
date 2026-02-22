import { useMemo } from 'react';
import { truncateToPixelWidth, GOOGLE_FONTS, GOOGLE_MAX_WIDTHS } from '../utils/pixelWidth';

export function GoogleMobilePreview({ title, description, url }) {
  const displayTitle = useMemo(
    () => truncateToPixelWidth(title || 'Page Title', GOOGLE_FONTS.mobileTitle, GOOGLE_MAX_WIDTHS.mobileTitle),
    [title]
  );

  const displayDescription = useMemo(
    () => truncateToPixelWidth(description || 'Add a meta description to see how it will appear in mobile search results.', GOOGLE_FONTS.mobileDescription, GOOGLE_MAX_WIDTHS.mobileDescription),
    [description]
  );

  const displayUrl = url || 'https://example.com';

  let domain = displayUrl;
  try {
    domain = new URL(displayUrl).hostname;
  } catch {
    domain = displayUrl.replace(/^https?:\/\//, '').split('/')[0];
  }

  const isEmpty = !title && !description && !url;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
        <span className="text-sm text-galactic">Google Mobile Preview</span>
      </div>

      {/* Mobile SERP container - narrower card style */}
      <div className="flex justify-center">
        <div
          className={`bg-white rounded-xl shadow-md w-full max-w-[400px] ${isEmpty ? 'opacity-50' : ''}`}
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          {/* Card content */}
          <div className="p-4">
            {/* URL line with favicon */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-3.5 h-3.5 bg-gray-300 rounded-sm" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[#202124] truncate">{domain}</div>
              </div>
            </div>

            {/* Title */}
            <h3
              className="mb-1.5"
              style={{
                color: '#1a0dab',
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                lineHeight: '1.3',
              }}
            >
              {displayTitle}
            </h3>

            {/* Description */}
            <p
              style={{
                color: '#4d5156',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                lineHeight: '1.5',
              }}
            >
              {displayDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
