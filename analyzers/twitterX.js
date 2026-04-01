const PLATFORM_NAME = "twitter";
const BUTTON_ATTRIBUTE = "data-grabclip-button";

const PLATFORM_INFO = {
  name: PLATFORM_NAME,
  displayName: 'Twitter',
  domains: ['x.com'],
  needCookie: false,
  analyzer: null,
};

// Button configuration constants
const PARAMS = {
  MINI: {
    size: "24px",
    svgSize: "14px",
    margin: {
      top: "auto",
      right: "15px",
      bottom: "auto",
      left: "auto",
    },
  },
};

// DOM selectors
const SELECTORS = {
  ARTICLE: 'article',
  ACTION_BAR: 'div[role="group"]',
  VIDEO: 'video',
  LINK_A: 'a',
  LINK_A_TIME: 'a time',
};


function closestWithLimit(element, selector, maxDepth = 7) {
  let current = element;
  let depth = 0;
  
  while (current && depth < maxDepth) {
    if (current.matches(selector)) {
      return current;
    }
    current = current.parentElement;
    depth++;
  }
  
  return null;
}


class InstagramAnalyzer extends window.BaseAnalyzer {
  constructor() {
    super(PLATFORM_NAME);
    this.observer = null;
  }


  extractVideoPageInfo(button=null) {
    let curPageUrl = window.location.href;
      
    if (button) {
      const article = button.closest(SELECTORS.ARTICLE);
      if (article) {
        const time = article.querySelector(SELECTORS.LINK_A_TIME);
        if (time) {
          const link = time.closest(SELECTORS.LINK_A);
          if (link) {
            curPageUrl = link.href;
          }
        }
      }
    }
    
    return {
      platform: PLATFORM_NAME,
      url: curPageUrl
    };
  }

  
  addGrabClipButton() {
    console.debug(`[${PLATFORM_NAME}] Starting addGrabClipButton`);

    try {
      const url = window.location.href;
      console.debug(`[${PLATFORM_NAME}] Current URL: ${url}`);
      
      const articles = document.querySelectorAll(SELECTORS.ARTICLE);
      if (articles.length === 0) {
        console.debug(`[${PLATFORM_NAME}] Article element not found on page`);
        return false;
      }

      articles.forEach((article) => {
        const video = article.querySelector(SELECTORS.VIDEO);
        if (video) {
          const actionBar = article.querySelector(SELECTORS.ACTION_BAR);
          if (!actionBar) {
            console.log(`[${PLATFORM_NAME}] No action bar found`);
            return;
          }
        
          if (actionBar.querySelector(`button[${BUTTON_ATTRIBUTE}]`)) {
            console.log(`[${PLATFORM_NAME}] GrabClip button already exists`);
            return;
          }

          const button = this.createGrabClipButton(PLATFORM_INFO, PARAMS.MINI);
          actionBar.insertBefore(button, actionBar.firstChild);    
          console.log(`[${PLATFORM_NAME}] Successfully added GrabClip button to video page`);
          return;      
        }
      })

      return true;
    } catch (error) {
      console.error(`[${PLATFORM_NAME}] Error adding GrabClip button:`, error);
    }

    return false;
  }

  insertDownloadButton() {
    console.info(`[${PLATFORM_NAME}] Initializing insertDownloadButton`);

    this.addGrabClipButton();

    this.configureObserver({
      selectors: [
        SELECTORS.ACTION_BAR,
      ],
    });

    this.initMutationObserver();
    console.info(`[${PLATFORM_NAME}] Mutation observer initialized`);
  }
}

PLATFORM_INFO.analyzer = InstagramAnalyzer;
window.PLATFORMS = {
  ...window.PLATFORMS,
  [PLATFORM_NAME]: PLATFORM_INFO,
};
console.info(`[${PLATFORM_NAME}] Analyzer module loaded and registered`);
