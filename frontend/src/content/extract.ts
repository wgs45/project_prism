/// <reference types="@types/chrome" />

// Selectors for finding the core content area of a webpage, ranked by priority
const PRIORITY_SELECTORS = ["article", "main", ".content", ".post", ".article"];

// HTML tags that contain clutter, navigation, or code instead of main text
const BLACKLIST = ["nav", "footer", "aside", "script", "style", "noscript"];

// Cleans up the raw text by removing extra spaces and common cookie banner phrases
function cleanText(text: string) {
  return text
    .replace(/\s+/g, " ") // Collapses multiple spaces/newlines into a single space
    .replace(/Cookie Policy/gi, "") // Removes "Cookie Policy" text case-insensitively
    .replace(/Accept All/gi, "") // Removes "Accept All" text case-insensitively
    .trim(); // Trims spaces from the start and end
}

// Orchestrates the extraction by looking for the best content container
function extractSemanticContent() {
  // Loop through priority selectors to find the main article container
  for (const selector of PRIORITY_SELECTORS) {
    const el = document.querySelector(selector);

    if (el) {
      return cleanNode(el); // If found (e.g., <article>), clean and extract from it
    }
  }

  // Fallback: If no priority containers exist, extract from the whole body
  return cleanNode(document.body);
}

// Purges blacklisted elements and extracts text from headings and paragraphs
function cleanNode(root: Element): string {
  // Clone the element so we don't delete parts of the live website
  const clonedRoot = root.cloneNode(true) as Element;

  // Now we safely remove blacklisted elements from the clone only
  BLACKLIST.forEach((tag) => {
    clonedRoot.querySelectorAll(tag).forEach((n) => n.remove());
  });

  // Extract text from the clone instead of the live root
  const headings = Array.from(clonedRoot.querySelectorAll("h1, h2, h3")).map(
    (el) => el.textContent,
  );

  const paragraphs = Array.from(clonedRoot.querySelectorAll("p")).map(
    (el) => el.textContent,
  );

  const combined = [...headings, ...paragraphs].filter(Boolean).join("\n");

  return cleanText(combined).slice(0, 15000);
}

// Listens for messages sent from the extension's background script or popup
chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
  // Check if the requested action is to extract the page content
  if (msg.type === "EXTRACT_PAGE") {
    // Send back the cleaned content, the current URL, and the webpage title
    sendResponse({
      content: extractSemanticContent(),
      url: location.href,
      title: document.title,
    });
  }
});
