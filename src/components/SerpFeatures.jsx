import { ToggleSwitch } from './ToggleSwitch';

const inputClasses = 'w-full px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors';
const selectClasses = 'px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors cursor-pointer';
const labelClasses = 'block text-xs font-medium text-galactic mb-1';

export function SerpFeatures({ richResults, setRichResults }) {
  const update = (feature, changes) => {
    setRichResults(prev => ({
      ...prev,
      [feature]: { ...prev[feature], ...changes },
    }));
  };

  const toggleFeature = (feature) => {
    update(feature, { enabled: !richResults[feature].enabled });
  };

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8 mt-6">
      <h2 className="text-lg font-semibold text-white mb-1">Rich Result Features</h2>
      <p className="text-sm text-galactic mb-6">Enhance your Google listing with structured data previews</p>

      <div className="space-y-4">
        {/* Product */}
        <FeatureRow
          label="Product Info"
          description="Price, availability, and rating"
          enabled={richResults.product.enabled}
          onToggle={() => toggleFeature('product')}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={labelClasses}>Price</label>
              <input
                type="text"
                value={richResults.product.price}
                onChange={(e) => update('product', { price: e.target.value })}
                placeholder="29.99"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Currency</label>
              <select
                value={richResults.product.currency}
                onChange={(e) => update('product', { currency: e.target.value })}
                className={selectClasses + ' w-full'}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (&euro;)</option>
                <option value="GBP">GBP (&pound;)</option>
                <option value="JPY">JPY (&yen;)</option>
                <option value="CAD">CAD (C$)</option>
                <option value="AUD">AUD (A$)</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Availability</label>
              <select
                value={richResults.product.availability}
                onChange={(e) => update('product', { availability: e.target.value })}
                className={selectClasses + ' w-full'}
              >
                <option value="InStock">In Stock</option>
                <option value="OutOfStock">Out of Stock</option>
                <option value="PreOrder">Pre-order</option>
              </select>
            </div>
            <div className="hidden sm:block" />
            <div>
              <label className={labelClasses}>Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={richResults.product.rating}
                onChange={(e) => update('product', { rating: e.target.value })}
                placeholder="4.5"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Review Count</label>
              <input
                type="number"
                min="0"
                value={richResults.product.reviewCount}
                onChange={(e) => update('product', { reviewCount: e.target.value })}
                placeholder="128"
                className={inputClasses}
              />
            </div>
          </div>
        </FeatureRow>

        {/* Reviews */}
        <FeatureRow
          label="Review Stars"
          description="Standalone aggregate rating"
          enabled={richResults.reviews.enabled}
          onToggle={() => toggleFeature('reviews')}
        >
          <div className="grid grid-cols-2 gap-3 max-w-xs">
            <div>
              <label className={labelClasses}>Rating (1-5)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                value={richResults.reviews.rating}
                onChange={(e) => update('reviews', { rating: e.target.value })}
                placeholder="4.5"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Review Count</label>
              <input
                type="number"
                min="0"
                value={richResults.reviews.reviewCount}
                onChange={(e) => update('reviews', { reviewCount: e.target.value })}
                placeholder="128"
                className={inputClasses}
              />
            </div>
          </div>
        </FeatureRow>

        {/* Sitelinks */}
        <FeatureRow
          label="Sitelinks"
          description="Additional links below your result"
          enabled={richResults.sitelinks.enabled}
          onToggle={() => toggleFeature('sitelinks')}
        >
          <div className="space-y-2">
            {richResults.sitelinks.links.map((link, i) => (
              <div key={i} className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <input
                  type="text"
                  value={link.text}
                  onChange={(e) => {
                    const links = [...richResults.sitelinks.links];
                    links[i] = { ...links[i], text: e.target.value };
                    update('sitelinks', { links });
                  }}
                  placeholder={`Link text ${i + 1}`}
                  className={inputClasses}
                />
                <input
                  type="text"
                  value={link.url}
                  onChange={(e) => {
                    const links = [...richResults.sitelinks.links];
                    links[i] = { ...links[i], url: e.target.value };
                    update('sitelinks', { links });
                  }}
                  placeholder="https://..."
                  className={inputClasses}
                />
                {richResults.sitelinks.links.length > 2 && (
                  <button
                    type="button"
                    aria-label={`Remove sitelink ${i + 1}`}
                    onClick={() => {
                      const links = richResults.sitelinks.links.filter((_, idx) => idx !== i);
                      update('sitelinks', { links });
                    }}
                    className="p-2 -m-1 text-galactic hover:text-coral transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-azure rounded"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
            {richResults.sitelinks.links.length < 4 && (
              <button
                type="button"
                onClick={() => {
                  const links = [...richResults.sitelinks.links, { text: '', url: '' }];
                  update('sitelinks', { links });
                }}
                className="text-sm text-azure hover:text-white transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-azure rounded"
              >
                + Add link
              </button>
            )}
          </div>
        </FeatureRow>

        {/* FAQ */}
        <FeatureRow
          label="FAQ"
          description="Expandable Q&A dropdowns"
          enabled={richResults.faq.enabled}
          onToggle={() => toggleFeature('faq')}
        >
          <div className="space-y-3">
            {richResults.faq.items.map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.question}
                    onChange={(e) => {
                      const items = [...richResults.faq.items];
                      items[i] = { ...items[i], question: e.target.value };
                      update('faq', { items });
                    }}
                    placeholder={`Question ${i + 1}`}
                    className={inputClasses}
                  />
                  {richResults.faq.items.length > 2 && (
                    <button
                      type="button"
                      aria-label={`Remove question ${i + 1}`}
                      onClick={() => {
                        const items = richResults.faq.items.filter((_, idx) => idx !== i);
                        update('faq', { items });
                      }}
                      className="p-2 -m-1 text-galactic hover:text-coral transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-azure rounded"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={item.answer}
                  onChange={(e) => {
                    const items = [...richResults.faq.items];
                    items[i] = { ...items[i], answer: e.target.value };
                    update('faq', { items });
                  }}
                  placeholder={`Answer ${i + 1}`}
                  className={inputClasses + ' ml-0'}
                />
              </div>
            ))}
            {richResults.faq.items.length < 4 && (
              <button
                type="button"
                onClick={() => {
                  const items = [...richResults.faq.items, { question: '', answer: '' }];
                  update('faq', { items });
                }}
                className="text-sm text-azure hover:text-white transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-azure rounded"
              >
                + Add question
              </button>
            )}
          </div>
        </FeatureRow>

        {/* Breadcrumbs */}
        <FeatureRow
          label="Breadcrumbs"
          description="Custom URL path display"
          enabled={richResults.breadcrumbs.enabled}
          onToggle={() => toggleFeature('breadcrumbs')}
        >
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2 items-center">
              {richResults.breadcrumbs.items.map((item, i) => (
                <div key={i} className="flex items-center gap-1">
                  {i > 0 && <span className="text-galactic text-sm">›</span>}
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const items = [...richResults.breadcrumbs.items];
                      items[i] = e.target.value;
                      update('breadcrumbs', { items });
                    }}
                    placeholder={i === 0 ? 'Home' : `Level ${i + 1}`}
                    className={inputClasses + ' w-28'}
                  />
                  {richResults.breadcrumbs.items.length > 1 && (
                    <button
                      type="button"
                      aria-label={`Remove breadcrumb level ${i + 1}`}
                      onClick={() => {
                        const items = richResults.breadcrumbs.items.filter((_, idx) => idx !== i);
                        update('breadcrumbs', { items });
                      }}
                      className="p-2 -m-1 text-galactic hover:text-coral transition-colors focus:outline-none focus:ring-2 focus:ring-azure rounded"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
            {richResults.breadcrumbs.items.length < 5 && (
              <button
                type="button"
                onClick={() => {
                  const items = [...richResults.breadcrumbs.items, ''];
                  update('breadcrumbs', { items });
                }}
                className="text-sm text-azure hover:text-white transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-azure rounded"
              >
                + Add level
              </button>
            )}
          </div>
        </FeatureRow>

        {/* Date */}
        <FeatureRow
          label="Publication Date"
          description="Date shown before description"
          enabled={richResults.date.enabled}
          onToggle={() => toggleFeature('date')}
        >
          <div className="max-w-xs">
            <label className={labelClasses}>Date</label>
            <input
              type="date"
              value={richResults.date.value}
              onChange={(e) => update('date', { value: e.target.value })}
              className={inputClasses}
            />
          </div>
        </FeatureRow>

        {/* Video */}
        <FeatureRow
          label="Video Thumbnail"
          description="Video rich result with thumbnail"
          enabled={richResults.video.enabled}
          onToggle={() => toggleFeature('video')}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Thumbnail URL</label>
              <input
                type="text"
                value={richResults.video.thumbnailUrl}
                onChange={(e) => update('video', { thumbnailUrl: e.target.value })}
                placeholder="https://example.com/thumb.jpg"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Duration (mm:ss)</label>
              <input
                type="text"
                value={richResults.video.duration}
                onChange={(e) => update('video', { duration: e.target.value })}
                placeholder="3:45"
                className={inputClasses}
              />
            </div>
          </div>
        </FeatureRow>
      </div>
    </div>
  );
}

function FeatureRow({ label, description, enabled, onToggle, children }) {
  return (
    <div className={`rounded-xl border transition-colors duration-200 ${enabled ? 'border-azure/30 bg-azure/5' : 'border-metal/10'}`}>
      <div className="flex items-center gap-3 px-4 py-3">
        <ToggleSwitch enabled={enabled} onChange={onToggle} />
        <div className="min-w-0">
          <span className={`text-sm font-medium ${enabled ? 'text-white' : 'text-cloudy'}`}>{label}</span>
          <span className="text-xs text-galactic ml-2 hidden sm:inline">{description}</span>
        </div>
      </div>
      {enabled && (
        <div className="px-4 pb-4 pt-1 animate-fadeIn">
          {children}
        </div>
      )}
    </div>
  );
}
