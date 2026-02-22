export function TwitterPreview({ title, description, url, ogImage }) {
  const displayTitle = title || 'Page Title';
  const displayDescription = description || 'Add a meta description to see how it will appear when shared on Twitter/X.';
  const displayUrl = url || 'example.com';

  let domain = displayUrl;
  try {
    domain = new URL(displayUrl).hostname;
  } catch {
    domain = displayUrl.replace(/^https?:\/\//, '').split('/')[0];
  }

  const isEmpty = !title && !description && !url && !ogImage;

  // Truncate for Twitter display
  const twitterTitle = displayTitle.length > 70 ? displayTitle.slice(0, 67) + '...' : displayTitle;
  const twitterDescription = displayDescription.length > 200 ? displayDescription.slice(0, 197) + '...' : displayDescription;

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-galactic" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        <span className="text-sm text-galactic">Twitter/X Preview</span>
      </div>

      {/* Twitter Summary Large Image card */}
      <div className="flex justify-center">
        <div className={`w-full max-w-[500px] ${isEmpty ? 'opacity-50' : ''}`}>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
            {/* Image area */}
            <div className="w-full aspect-[2/1] bg-gray-100 flex items-center justify-center overflow-hidden">
              {ogImage ? (
                <img
                  src={ogImage}
                  alt="Card Preview"
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
            <div className="px-3 py-2.5">
              <div className="text-[#536471] text-sm">{domain}</div>
              <div className="text-[#0f1419] font-bold text-base leading-tight mt-0.5 line-clamp-2">
                {twitterTitle}
              </div>
              <div className="text-sm text-[#536471] mt-0.5 line-clamp-2">
                {twitterDescription}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
