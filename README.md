# X (Twitter) Video Parser Extension

X (Twitter) Video Parser is a lightweight browser extension designed to help users analyze and work with X.com video page URLs.

The extension runs locally in the browser and only processes publicly available information from X.com video pages when the user actively interacts with it. No background automation or unrelated page scanning is performed.

## Features

- Parse X.com video page URLs
- Extract structured video-related information from the current page
- Add a simple contextual action button on supported video pages
- Open the related GrabClip page for further processing

## How It Works

When the user clicks the extension icon or the contextual button added to a supported X.com video page, the extension:

1. Detects the current X.com video page
2. Extracts the relevant public page URL
3. Builds a structured request
4. Opens the corresponding GrabClip page in a new tab for continued processing

## Supported Platform

- X.com

Example supported URL:

```text
https://x.com/username/status/1234567890123456789

```

## Project Structure
```
├── analyzers/
│   ├── base.js
│   └── twitterX.js
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon64.png
│   └── icon128.png
├── _locales/
├── background.js
├── content.js
├── manifest.json
└── README.md
```

## Installation

### Load the extension locally

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode**
4. Click **Load unpacked**
5. Select the extension folder

## Usage

1. Open a supported X.com video page
2. Click the extension icon in the browser toolbar

or

1. Open a supported X.com video page
2. Click the action button inserted on the page

After activation, the extension will extract and process the current page URL.

## Permissions

This extension uses only the permissions required for its core functionality:

- `activeTab`
- Access to `x.com` pages

The extension does not require user login information and does not collect personal data.

## Privacy

- Runs locally in the browser
- Only works when the user actively clicks the extension icon or page button
- Does not perform background crawling
- Does not collect or store personal user data
- Does not transmit unrelated browsing activity to external servers

## Technology

- Chrome Extension Manifest V3
- JavaScript
- Native DOM APIs
- Chrome Extension APIs

## Browser Compatibility

- Google Chrome
- Microsoft Edge
- Other Chromium-based browsers

## Development Notes

### Main Components

- `background.js`  
  Handles extension icon clicks, platform detection, language selection, and page processing.

- `content.js`  
  Runs on supported X.com pages, initializes the analyzer, inserts the page button, and extracts page information when requested.

- `analyzers/twitterX.js`  
  Contains platform-specific logic for X.com page detection, button insertion, and URL extraction.

## Intended Use

This extension is intended for educational, analytical, and productivity purposes only.

Users are responsible for complying with the terms of service of the platforms they use and all applicable laws and regulations.

## License

MIT License
