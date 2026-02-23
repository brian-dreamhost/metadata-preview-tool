export function PreviewTabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 p-1 bg-oblivion border border-metal/20 rounded-xl overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex-shrink-0 sm:flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
            activeTab === tab
              ? 'bg-azure text-white'
              : 'text-galactic hover:text-white hover:bg-white/5'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
