# Metadata Preview Tool - Implementation Plan

## Overview
A comprehensive metadata preview tool that helps users optimize their SEO and social media metadata by providing live previews of how their content will appear across different platforms.

## Features

### 1. Google Search Preview
- **Desktop SERP Preview**: Shows how the page will appear in Google desktop search results
- **Mobile SERP Preview**: Shows how the page will appear in Google mobile search results
- **Character/Pixel Length Guidance**:
  - Title: ~60 characters / 580 pixels (desktop), 920 pixels (mobile)
  - Meta Description: ~155-160 characters / 920 pixels
- **Visual Truncation Indicators**: Show exactly where text will be cut off
- **Real-time Validation**: Color-coded feedback (green/yellow/red) based on length

### 2. Open Graph Preview
- **Facebook Preview**: Card preview with image, title, description, site name
- **Twitter/X Preview**:
  - Summary card (small image)
  - Summary with large image card
- **LinkedIn Preview**: How posts will appear when shared
- **Discord Preview**: Embed preview

### 3. Input Methods
- **Manual Input**: Type/paste title, description, URL, image URL directly
- **URL Fetch**: Enter a URL to automatically extract existing metadata
- **Real-time Editing**: Edit fetched metadata to see changes instantly

### 4. Additional Features
- **Favicon Preview**: Show favicon in SERP result
- **Breadcrumb Preview**: Optional breadcrumb display
- **Date Preview**: Show publication date if available
- **Copy Metadata**: Export optimized meta tags as HTML
- **Share/Save**: Generate shareable link with preview state

## Technical Architecture

### Stack
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: React hooks (useState, useReducer)
- **No Backend Required**: Client-side only (URL fetch via CORS proxy or browser extension)

### Component Structure
```
src/
├── components/
│   ├── MetadataForm/
│   │   ├── MetadataForm.tsx        # Main input form
│   │   ├── TitleInput.tsx          # Title field with counter
│   │   ├── DescriptionInput.tsx    # Description field with counter
│   │   ├── UrlInput.tsx            # URL input with fetch capability
│   │   └── ImageInput.tsx          # OG image URL input
│   ├── Previews/
│   │   ├── GooglePreview/
│   │   │   ├── GoogleDesktopPreview.tsx
│   │   │   ├── GoogleMobilePreview.tsx
│   │   │   └── GooglePreviewWrapper.tsx
│   │   ├── OpenGraphPreview/
│   │   │   ├── FacebookPreview.tsx
│   │   │   ├── TwitterPreview.tsx
│   │   │   ├── LinkedInPreview.tsx
│   │   │   └── DiscordPreview.tsx
│   │   └── PreviewTabs.tsx         # Tab navigation for previews
│   ├── Validators/
│   │   ├── LengthIndicator.tsx     # Visual length bar
│   │   ├── PixelWidthMeasurer.tsx  # Measure actual pixel width
│   │   └── ValidationSummary.tsx   # Overall validation status
│   └── common/
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Tabs.tsx
│       └── Button.tsx
├── hooks/
│   ├── useMetadata.ts              # Main state management
│   ├── usePixelWidth.ts            # Text pixel width calculation
│   └── useFetchMetadata.ts         # URL metadata fetching
├── utils/
│   ├── validation.ts               # Validation logic
│   ├── pixelWidth.ts               # Pixel width calculations
│   ├── metadataParser.ts           # Parse HTML for metadata
│   └── constants.ts                # Length limits, etc.
├── types/
│   └── metadata.ts                 # TypeScript interfaces
├── App.tsx
└── main.tsx
```

### Key Technical Considerations

#### Pixel Width Calculation
Google truncates based on pixel width, not character count. We'll use:
- Canvas API to measure actual rendered text width
- Google's font (Arial/Roboto) at appropriate sizes
- Account for different viewport widths

#### URL Metadata Fetching
Options for fetching metadata from URLs:
1. **CORS Proxy**: Use a free CORS proxy service (allorigins, cors-anywhere)
2. **Browser Extension**: Optional extension for direct fetching
3. **Server-side API**: Future enhancement

#### Responsive Previews
- Desktop Google SERP: ~600px container
- Mobile Google SERP: ~400px container (smartphone width)
- Social previews: Platform-specific dimensions

## Design System (DreamHost-aligned)

### Colors
- Primary: DreamHost blue (#0073EC)
- Success: Green (#22C55E)
- Warning: Yellow (#EAB308)
- Error: Red (#EF4444)
- Background: Dark theme (#1a1a2e, #16213e)
- Text: White/gray variations

### Typography
- Sans-serif font stack (system fonts)
- Monospace for code/metadata output

## User Flow

1. User lands on tool
2. Either:
   a. Enters URL → metadata is fetched and populated
   b. Manually enters metadata fields
3. Real-time previews update as user types
4. Validation indicators show optimization status
5. User can switch between preview types (Google/Facebook/Twitter/etc.)
6. User can copy optimized meta tags or share preview

## Validation Rules

### Title
- Minimum: 30 characters
- Optimal: 50-60 characters
- Maximum: 60 characters / 580 pixels
- Mobile max: 920 pixels

### Meta Description
- Minimum: 70 characters
- Optimal: 150-160 characters
- Maximum: 160 characters / 920 pixels

### Open Graph
- og:title: 60-90 characters
- og:description: 200 characters
- og:image: 1200x630 pixels recommended

### Twitter
- twitter:title: 70 characters
- twitter:description: 200 characters
- twitter:image: 1200x600 or 800x418 pixels

## Implementation Phases

### Phase 1: Core Foundation
- [ ] Project setup (Vite + React + TypeScript + Tailwind)
- [ ] Basic metadata form with title, description, URL inputs
- [ ] Google Desktop SERP preview
- [ ] Character count indicators

### Phase 2: Enhanced Google Preview
- [ ] Pixel width measurement
- [ ] Mobile SERP preview
- [ ] Visual truncation preview
- [ ] Favicon support
- [ ] Breadcrumb preview

### Phase 3: Open Graph Previews
- [ ] Facebook preview
- [ ] Twitter preview (both card types)
- [ ] LinkedIn preview
- [ ] Discord preview
- [ ] Image preview/validation

### Phase 4: Advanced Features
- [ ] URL metadata fetching
- [ ] Export as HTML meta tags
- [ ] Shareable preview links
- [ ] Keyboard shortcuts
- [ ] Dark/light theme toggle

## Questions for Clarification

1. **URL Fetching**: Should we include URL fetching in the initial version, or start with manual input only?
2. **Design System**: Should this follow existing DreamHost branding, or a custom design?
3. **Deployment**: Where will this be hosted? (Affects CORS strategy)
4. **Additional Platforms**: Any other preview types needed? (Pinterest, Slack, iMessage, etc.)
