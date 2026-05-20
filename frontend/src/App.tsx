import { Popup } from "./popup/Popup";
import { useEffect } from "react";
import { Skeleton } from "./popup/components/Skeleton";
import { SummaryContent } from "./popup/components/SummaryContent";
import { useSummaryStream } from "./popup/hooks/useSummaryStream";
import { copyMarkdown } from "./shared/markdown";
import { sanitizeInput } from "./shared/sanitizer";

export default function App() {
  const { loading, summary, summarize } = useSummaryStream();

  async function handleSummarize() {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage(
      tab.id!,
      { type: "EXTRACT_PAGE" },
      async (response) => {
        const cleaned = sanitizeInput(response.content);

        await summarize(cleaned);
      },
    );
  }

  useEffect(() => {
    handleSummarize();
  }, []);

  return (
    <Popup>
      {loading ? <Skeleton /> : <SummaryContent summary={summary} />}

      {summary && (
        <button
          onClick={() => copyMarkdown(summary)}
          className="mt-5 w-full rounded-2xl border border-sky-400/20 bg-sky-400/10 px-4 py-3 text-sm font-medium transition-all hover:bg-sky-400/20"
        >
          Copy Markdown
        </button>
      )}
    </Popup>
  );
}
