import { useState } from "react";

export function useSummaryStream() {
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  async function summarize(content: string) {
    setLoading(true);
    setSummary("");

    const response = await fetch("http://localhost:5173/api/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const reader = response.body?.getReader();

    if (!reader) return;

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const chunk = decoder.decode(value);

      setSummary((prev) => prev + chunk);
    }
    setLoading(false);
  }

  return {
    loading,
    summary,
    summarize,
  };
}
