import { useState } from 'react';
import { MetadataForm } from './components/MetadataForm';
import { PreviewTabs } from './components/PreviewTabs';
import { GoogleDesktopPreview } from './components/GoogleDesktopPreview';
import { GoogleMobilePreview } from './components/GoogleMobilePreview';
import { FacebookPreview } from './components/FacebookPreview';
import { TwitterPreview } from './components/TwitterPreview';
import { ExportMetaTags } from './components/ExportMetaTags';
import { SerpFeatures } from './components/SerpFeatures';

const TABS = ['Google Desktop', 'Google Mobile', 'Facebook', 'Twitter/X'];

/* ========== DEV MODE START - Remove this block for production ========== */
const DUMMY_DATA = {
  title: 'Best Wireless Headphones 2025 — Expert Reviews & Buyer\'s Guide',
  description: 'Compare the top-rated wireless headphones of 2025. We tested 50+ models for sound quality, comfort, battery life, and value. Find your perfect pair today.',
  url: 'https://www.techreviews.com/audio/best-wireless-headphones',
  ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=630&fit=crop',
  richResults: {
    product: { enabled: true, price: '349.99', currency: 'USD', availability: 'InStock', rating: '4.7', reviewCount: '2841' },
    reviews: { enabled: false, rating: '', reviewCount: '' },
    sitelinks: { enabled: true, links: [
      { text: 'Over-Ear Headphones', url: 'https://www.techreviews.com/audio/over-ear' },
      { text: 'Noise Cancelling', url: 'https://www.techreviews.com/audio/noise-cancelling' },
      { text: 'Under $100', url: 'https://www.techreviews.com/audio/budget' },
      { text: 'Compare Models', url: 'https://www.techreviews.com/audio/compare' },
    ]},
    faq: { enabled: true, items: [
      { question: 'What are the best wireless headphones in 2025?', answer: 'The Sony WH-1000XM6 tops our list, followed by the Apple AirPods Max 2 and Bose QuietComfort Ultra.' },
      { question: 'Are expensive headphones worth it?', answer: 'Premium headphones offer better sound quality, comfort, and noise cancellation, but great options exist under $100 too.' },
    ]},
    breadcrumbs: { enabled: true, items: ['Home', 'Audio', 'Headphones'] },
    date: { enabled: true, value: '2025-01-15' },
    video: { enabled: false, thumbnailUrl: '', duration: '' },
  },
};
/* ========== DEV MODE END ========== */

const INITIAL_RICH_RESULTS = {
  product: { enabled: false, price: '', currency: 'USD', availability: 'InStock', rating: '', reviewCount: '' },
  reviews: { enabled: false, rating: '', reviewCount: '' },
  sitelinks: { enabled: false, links: [{ text: '', url: '' }, { text: '', url: '' }] },
  faq: { enabled: false, items: [{ question: '', answer: '' }, { question: '', answer: '' }] },
  breadcrumbs: { enabled: false, items: [''] },
  date: { enabled: false, value: '' },
  video: { enabled: false, thumbnailUrl: '', duration: '' },
};

function App() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [ogImage, setOgImage] = useState('');
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [richResults, setRichResults] = useState(INITIAL_RICH_RESULTS);

  /* ========== DEV MODE START - Remove this block for production ========== */
  const fillTestData = () => {
    setTitle(DUMMY_DATA.title);
    setDescription(DUMMY_DATA.description);
    setUrl(DUMMY_DATA.url);
    setOgImage(DUMMY_DATA.ogImage);
    setRichResults(DUMMY_DATA.richResults);
  };
  /* ========== DEV MODE END ========== */

  const metadata = { title, description, url, ogImage };

  const renderPreview = () => {
    switch (activeTab) {
      case 'Google Desktop':
        return <GoogleDesktopPreview {...metadata} richResults={richResults} />;
      case 'Google Mobile':
        return <GoogleMobilePreview {...metadata} />;
      case 'Facebook':
        return <FacebookPreview {...metadata} />;
      case 'Twitter/X':
        return <TwitterPreview {...metadata} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-abyss text-white bg-glow">
      <div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
        <div className="animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 mb-6 border border-turtle text-turtle text-sm font-medium rounded-full">
              Free Tool
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
              Metadata Preview Tool
            </h1>
            <p className="text-lg text-cloudy max-w-2xl mx-auto leading-relaxed">
              See how your pages will appear in Google search results and social media before publishing.
            </p>
          </div>

          {/* ========== DEV MODE START - Remove this block for production ========== */}
          <div className="flex justify-end mb-4">
            <button
              type="button"
              onClick={fillTestData}
              className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors"
            >
              Fill Test Data
            </button>
          </div>
          {/* ========== DEV MODE END ========== */}

          {/* Input Form */}
          <MetadataForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            url={url}
            setUrl={setUrl}
            ogImage={ogImage}
            setOgImage={setOgImage}
          />

          {/* Rich Result Features */}
          <SerpFeatures richResults={richResults} setRichResults={setRichResults} />

          {/* Preview Tabs */}
          <div className="mt-10">
            <PreviewTabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="mt-6">
              {renderPreview()}
            </div>
          </div>

          {/* Export Section */}
          <div className="mt-10">
            <ExportMetaTags {...metadata} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-metal/30 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-galactic">
            <p>Free Metadata Preview Tool — Part of the DreamHost SEO Tools collection</p>
            <div className="flex items-center gap-4">
              <a
                href="https://developers.google.com/search/docs/appearance/snippet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-azure hover:text-white transition-colors"
              >
                Google Snippet Guide
              </a>
              <a
                href="https://ogp.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Open Graph Protocol
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
