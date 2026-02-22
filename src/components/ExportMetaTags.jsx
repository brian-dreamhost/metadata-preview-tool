import { useState } from 'react';

export function ExportMetaTags({ title, description, url, ogImage }) {
  const [copied, setCopied] = useState(false);

  const generateTags = () => {
    const tags = [];

    if (title) {
      tags.push(`<title>${escapeHtml(title)}</title>`);
      tags.push(`<meta property="og:title" content="${escapeAttr(title)}" />`);
      tags.push(`<meta name="twitter:title" content="${escapeAttr(title)}" />`);
    }

    if (description) {
      tags.push(`<meta name="description" content="${escapeAttr(description)}" />`);
      tags.push(`<meta property="og:description" content="${escapeAttr(description)}" />`);
      tags.push(`<meta name="twitter:description" content="${escapeAttr(description)}" />`);
    }

    if (url) {
      tags.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
    }

    if (ogImage) {
      tags.push(`<meta property="og:image" content="${escapeAttr(ogImage)}" />`);
      tags.push(`<meta name="twitter:image" content="${escapeAttr(ogImage)}" />`);
      tags.push(`<meta name="twitter:card" content="summary_large_image" />`);
    } else {
      tags.push(`<meta name="twitter:card" content="summary" />`);
    }

    tags.push(`<meta property="og:type" content="website" />`);

    return tags.join('\n');
  };

  const handleCopy = async () => {
    const tags = generateTags();
    try {
      await navigator.clipboard.writeText(tags);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const hasSomeData = title || description || url || ogImage;
  const tags = generateTags();

  return (
    <div className="card-gradient border border-metal/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Meta Tags</h2>
        <button
          onClick={handleCopy}
          disabled={!hasSomeData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-azure text-white text-sm font-medium rounded-lg hover:bg-azure-hover focus:outline-none focus:ring-2 focus:ring-azure focus:ring-offset-2 focus:ring-offset-abyss transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
              </svg>
              Copy Meta Tags
            </>
          )}
        </button>
      </div>

      {hasSomeData ? (
        <div className="bg-midnight border border-metal/30 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm font-mono text-cloudy whitespace-pre">{tags}</pre>
        </div>
      ) : (
        <p className="text-galactic text-sm">Enter metadata above to generate HTML meta tags.</p>
      )}

      {/* Toast */}
      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="flex items-center gap-2 px-4 py-2 bg-oblivion border border-metal/30 text-white rounded-lg shadow-lg">
            <svg className="w-5 h-5 text-turtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>Meta tags copied to clipboard!</span>
          </div>
        </div>
      )}
    </div>
  );
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
