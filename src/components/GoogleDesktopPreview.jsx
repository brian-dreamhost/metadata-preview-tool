import { useMemo } from 'react';
import { truncateToPixelWidth, GOOGLE_FONTS, GOOGLE_MAX_WIDTHS } from '../utils/pixelWidth';

const CURRENCY_SYMBOLS = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', CAD: 'C$', AUD: 'A$' };
const AVAILABILITY_LABELS = { InStock: 'In stock', OutOfStock: 'Out of stock', PreOrder: 'Pre-order' };
const AVAILABILITY_COLORS = { InStock: '#188038', OutOfStock: '#c5221f', PreOrder: '#1a73e8' };

export function GoogleDesktopPreview({ title, description, url, richResults }) {
  const displayTitle = useMemo(
    () => truncateToPixelWidth(title || 'Page Title', GOOGLE_FONTS.desktopTitle, GOOGLE_MAX_WIDTHS.desktopTitle),
    [title]
  );

  const displayDescription = useMemo(
    () => truncateToPixelWidth(description || 'Add a meta description to see how it will appear in search results.', GOOGLE_FONTS.desktopDescription, GOOGLE_MAX_WIDTHS.desktopDescription),
    [description]
  );

  const displayUrl = url || 'https://example.com';

  let domain = displayUrl;
  try {
    domain = new URL(displayUrl).hostname;
  } catch {
    domain = displayUrl.replace(/^https?:\/\//, '').split('/')[0];
  }

  let urlPath = displayUrl;
  try {
    const parsed = new URL(displayUrl);
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    urlPath = pathParts.length > 0
      ? parsed.hostname + ' › ' + pathParts.join(' › ')
      : parsed.hostname;
  } catch {
    urlPath = displayUrl.replace(/^https?:\/\//, '');
  }

  const isEmpty = !title && !description && !url;

  // Breadcrumbs override the URL path
  const showBreadcrumbs = richResults?.breadcrumbs?.enabled && richResults.breadcrumbs.items.some(i => i);
  const breadcrumbPath = showBreadcrumbs
    ? domain + ' › ' + richResults.breadcrumbs.items.filter(i => i).join(' › ')
    : null;

  // Date prefix
  const showDate = richResults?.date?.enabled && richResults.date.value;
  const formattedDate = showDate
    ? new Date(richResults.date.value + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  // Product (takes precedence over standalone reviews)
  const showProduct = richResults?.product?.enabled;
  const showReviews = richResults?.reviews?.enabled && !showProduct;

  // Sitelinks
  const showSitelinks = richResults?.sitelinks?.enabled && richResults.sitelinks.links.some(l => l.text);

  // FAQ
  const showFaq = richResults?.faq?.enabled && richResults.faq.items.some(i => i.question);

  // Video
  const showVideo = richResults?.video?.enabled && (richResults.video.thumbnailUrl || richResults.video.duration);

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
        </svg>
        <span className="text-sm text-galactic">Google Desktop Preview</span>
      </div>

      {/* SERP Result Container */}
      <div className={`bg-white rounded-lg p-3 sm:p-5 max-w-[600px] ${isEmpty ? 'opacity-50' : ''}`} style={{ fontFamily: 'Arial, sans-serif' }}>

        {/* Main result area — flex row if video thumbnail is present */}
        <div className={showVideo ? 'flex gap-4' : ''}>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            {/* URL line with favicon */}
            <div className="flex items-center gap-3 mb-1">
              <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="w-4 h-4 bg-gray-300 rounded-sm" />
              </div>
              <div className="min-w-0">
                <div className="text-sm text-[#202124] leading-tight">{domain}</div>
                <div className="text-xs text-[#4d5156] leading-tight truncate">
                  {breadcrumbPath || urlPath}
                </div>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-xl leading-[1.3] mb-1 cursor-pointer"
              style={{ color: '#1a0dab', fontFamily: 'Arial, sans-serif', fontSize: '20px', lineHeight: '1.3' }}
            >
              {displayTitle}
            </h3>

            {/* Description (with optional date prefix) */}
            <p
              className="text-sm leading-[1.58]"
              style={{ color: '#4d5156', fontFamily: 'Arial, sans-serif', fontSize: '14px', lineHeight: '1.58' }}
            >
              {formattedDate && (
                <span style={{ color: '#70757a' }}>{formattedDate} — </span>
              )}
              {displayDescription}
            </p>

            {/* Product rich result */}
            {showProduct && (
              <div className="mt-1.5 flex items-center gap-1 flex-wrap" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                {richResults.product.rating && (
                  <>
                    <StarRating rating={parseFloat(richResults.product.rating) || 0} />
                    <span style={{ color: '#70757a' }}>
                      {' '}{richResults.product.rating}
                      {richResults.product.reviewCount && ` (${Number(richResults.product.reviewCount).toLocaleString()})`}
                    </span>
                  </>
                )}
                {richResults.product.price && (
                  <>
                    <span style={{ color: '#70757a' }}> · </span>
                    <span style={{ color: '#202124', fontWeight: 400 }}>
                      {CURRENCY_SYMBOLS[richResults.product.currency] || '$'}{richResults.product.price}
                    </span>
                  </>
                )}
                <span style={{ color: '#70757a' }}> · </span>
                <span style={{ color: AVAILABILITY_COLORS[richResults.product.availability] || '#188038' }}>
                  {AVAILABILITY_LABELS[richResults.product.availability] || 'In stock'}
                </span>
              </div>
            )}

            {/* Standalone reviews */}
            {showReviews && richResults.reviews.rating && (
              <div className="mt-1.5 flex items-center gap-1" style={{ fontSize: '14px', lineHeight: '1.4' }}>
                <StarRating rating={parseFloat(richResults.reviews.rating) || 0} />
                <span style={{ color: '#70757a' }}>
                  {' '}Rating: {richResults.reviews.rating}
                  {richResults.reviews.reviewCount && ` · ${Number(richResults.reviews.reviewCount).toLocaleString()} reviews`}
                </span>
              </div>
            )}
          </div>

          {/* Video thumbnail (right side) */}
          {showVideo && (
            <div className="flex-shrink-0 relative" style={{ width: '120px', height: '90px' }}>
              {richResults.video.thumbnailUrl ? (
                <img
                  src={richResults.video.thumbnailUrl}
                  alt="Video"
                  className="w-full h-full object-cover rounded"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              )}
              {richResults.video.duration && (
                <div
                  className="absolute bottom-1 right-1 px-1 rounded text-white text-xs font-medium"
                  style={{ backgroundColor: 'rgba(0,0,0,0.8)', fontSize: '11px', lineHeight: '18px' }}
                >
                  {richResults.video.duration}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sitelinks — 2-column grid below the result */}
        {showSitelinks && (
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-gray-100 pt-3">
            {richResults.sitelinks.links.filter(l => l.text).map((link, i) => (
              <div key={i}>
                <div style={{ color: '#1a0dab', fontSize: '14px', lineHeight: '1.3' }} className="cursor-pointer hover:underline">
                  {link.text}
                </div>
                {link.url && (
                  <div style={{ color: '#4d5156', fontSize: '12px', lineHeight: '1.4' }} className="truncate">
                    {link.url.replace(/^https?:\/\//, '')}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* FAQ — expandable question rows */}
        {showFaq && (
          <div className="mt-3 border-t border-gray-100 pt-2">
            <div className="text-xs font-medium mb-1" style={{ color: '#202124' }}>People also ask</div>
            {richResults.faq.items.filter(i => i.question).map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-gray-100 cursor-pointer"
                style={{ fontSize: '14px', color: '#202124' }}
              >
                <span>{item.question}</span>
                <svg className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Renders Google-style star rating with partial fill support.
 */
function StarRating({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = Math.min(1, Math.max(0, rating - (i - 1)));
    stars.push(
      <svg key={i} width="14" height="14" viewBox="0 0 24 24" style={{ display: 'inline-block' }}>
        <defs>
          <linearGradient id={`star-fill-${i}-${rating}`}>
            <stop offset={`${fill * 100}%`} stopColor="#fbbc04" />
            <stop offset={`${fill * 100}%`} stopColor="#dadce0" />
          </linearGradient>
        </defs>
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={`url(#star-fill-${i}-${rating})`}
        />
      </svg>
    );
  }
  return <span className="inline-flex items-center">{stars}</span>;
}
