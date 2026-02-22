export function FacebookPreview({ title, description, url, ogImage }) {
  const displayTitle = title || 'Page Title';
  const displayDescription = description || 'Add a meta description to see how it will appear when shared on Facebook.';
  const displayUrl = url || 'example.com';

  let domain = displayUrl;
  try {
    domain = new URL(displayUrl).hostname.toUpperCase();
  } catch {
    domain = displayUrl.replace(/^https?:\/\//, '').split('/')[0].toUpperCase();
  }

  const isEmpty = !title && !description && !url && !ogImage;

  // Truncate title for Facebook display (~90 chars)
  const fbTitle = displayTitle.length > 90 ? displayTitle.slice(0, 87) + '...' : displayTitle;
  // Truncate description for Facebook display (~200 chars)
  const fbDescription = displayDescription.length > 200 ? displayDescription.slice(0, 197) + '...' : displayDescription;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
        <span className="text-sm text-galactic">Facebook Preview</span>
      </div>

      {/* Facebook card preview */}
      <div className="flex justify-center">
        <div className={`w-full max-w-[500px] ${isEmpty ? 'opacity-50' : ''}`}>
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            {/* Image area */}
            <div className="w-full aspect-[1.91/1] bg-gray-100 flex items-center justify-center overflow-hidden">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="OG Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className={`w-full h-full flex-col items-center justify-center gap-3 text-gray-400 ${ogImage ? 'hidden' : 'flex'}`}
              >
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
                <span className="text-sm">No image provided</span>
              </div>
            </div>

            {/* Text content */}
            <div className="px-3 py-2.5 bg-[#f2f3f5]">
              <div className="text-xs text-[#606770] uppercase tracking-wide">{domain}</div>
              <div className="text-[#1d2129] font-semibold text-base leading-tight mt-0.5 line-clamp-2">
                {fbTitle}
              </div>
              <div className="text-sm text-[#606770] mt-0.5 line-clamp-1">
                {fbDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
