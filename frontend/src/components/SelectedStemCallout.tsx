import { forwardRef } from "react";
import { BarChart3, Calendar, Tag } from "lucide-react";
import type { OrganismData } from "@/three/organismTypes";
import {
  CalloutField,
  formatAccountAge,
  ReefCalloutShell,
} from "@/components/ReefCallout";
import { ReefCalloutSourceRow } from "@/components/ReefSourceIcon";

type SelectedStemCalloutProps = {
  organismData: OrganismData;
  onClose: () => void;
  className?: string;
};

export const SelectedStemCallout = forwardRef<HTMLDivElement, SelectedStemCalloutProps>(
  function SelectedStemCallout({ organismData, onClose, className }, ref) {
    const postCount = organismData.posts?.length ?? 0;
    const topicCount = organismData.topics.length;
    const ageLabel = formatAccountAge(organismData.accountAgeDays);

    return (
      <ReefCalloutShell
        ref={ref}
        ariaLabel="Account history details"
        onClose={onClose}
        className={className}
      >
        <ReefCalloutSourceRow
          label="Stem:"
          value="Account history"
          icon={{ kind: "stem" }}
        />

        <dl className="reef-post-callout__fields">
          <CalloutField icon={Calendar} label="Age" value={ageLabel} />
          <CalloutField icon={BarChart3} label="Posts" value={postCount.toLocaleString()} />
          <CalloutField icon={Tag} label="Topics" value={topicCount.toLocaleString()} />
        </dl>
      </ReefCalloutShell>
    );
  },
);
