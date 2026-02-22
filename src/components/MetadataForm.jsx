import { CharacterCount } from './CharacterCount';
import { LIMITS } from '../utils/validation';

export function MetadataForm({
  title, setTitle,
  description, setDescription,
  url, setUrl,
  ogImage, setOgImage,
}) {
  const inputClasses = 'w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-galactic focus:outline-none focus:ring-2 focus:ring-azure focus:border-transparent transition-colors';

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <h2 className="text-lg font-semibold text-white mb-6">Page Metadata</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Page Title */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-cloudy mb-2">
            Page Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your page title"
            className={inputClasses}
          />
          <CharacterCount length={title.length} limits={LIMITS.title} />
        </div>

        {/* Meta Description */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-cloudy mb-2">
            Meta Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your meta description"
            rows={3}
            className={inputClasses + ' resize-none'}
          />
          <CharacterCount length={description.length} limits={LIMITS.description} />
        </div>

        {/* URL */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-2">
            Page URL
          </label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/page"
            className={inputClasses}
          />
          <p className="text-xs text-galactic mt-1">Display URL shown in previews</p>
        </div>

        {/* OG Image */}
        <div>
          <label className="block text-sm font-medium text-cloudy mb-2">
            OG Image URL
            <span className="text-galactic font-normal ml-1">(optional)</span>
          </label>
          <input
            type="text"
            value={ogImage}
            onChange={(e) => setOgImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className={inputClasses}
          />
          <p className="text-xs text-galactic mt-1">Used in social media previews</p>
        </div>
      </div>
    </div>
  );
}
