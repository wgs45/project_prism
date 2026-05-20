export async function copyMarkdown(markdown: string) {
  await navigator.clipboard.writeText(markdown);
}
