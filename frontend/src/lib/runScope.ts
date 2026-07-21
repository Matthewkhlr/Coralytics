import type { Analysis } from "@/api/types";
import { formatPlatform } from "@/lib/format";

const SOURCE_PLATFORMS = new Set(["instagram", "linkedin", "reddit"]);

function platformsFromSummary(summary: NonNullable<Analysis["source_summary"]>) {
  const fromList = summary.platforms.filter((platform) => SOURCE_PLATFORMS.has(platform));
  if (fromList.length > 0) return fromList;

  const fromUploads = (summary.uploads ?? []).flatMap((upload) => {
    const multi = (upload as { platforms?: string[] }).platforms;
    if (multi?.length) return multi.filter((platform) => SOURCE_PLATFORMS.has(platform));
    return SOURCE_PLATFORMS.has(upload.platform) ? [upload.platform] : [];
  });

  return [...new Set(fromUploads)];
}

function platformsFromBreakdown(analysis: Analysis) {
  return [
    ...new Set(
      (analysis.platform_breakdown ?? [])
        .map((row) => row.platform)
        .filter((platform) => SOURCE_PLATFORMS.has(platform)),
    ),
  ];
}

export function resolveRunScope(analysis: Analysis) {
  const summary = analysis.source_summary;
  const summaryPlatforms = summary ? platformsFromSummary(summary) : [];
  const platforms =
    summaryPlatforms.length > 0 ? summaryPlatforms : platformsFromBreakdown(analysis);

  return {
    postCount: summary?.post_count || analysis.post_count,
    uploadCount: summary?.upload_count ?? analysis.upload_ids?.length ?? 0,
    sourcesLabel:
      platforms.length > 0
        ? platforms.map((platform) => formatPlatform(platform)).join(", ")
        : "—",
  };
}
