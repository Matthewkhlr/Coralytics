import { forwardRef } from "react";
import { BarChart3, MessageSquare, MessagesSquare, Tag } from "lucide-react";
import type { OrganismTopic } from "@/three/organismTypes";
import {
  CalloutField,
  capitalizeLabel,
  ReefCalloutShell,
  sentimentFromCompound,
} from "@/components/ReefCallout";
import { ReefCalloutSourceRow } from "@/components/ReefSourceIcon";

type SelectedTopicCalloutProps = {
  topic: OrganismTopic;
  onClose: () => void;
  className?: string;
};

export const SelectedTopicCallout = forwardRef<HTMLDivElement, SelectedTopicCalloutProps>(
  function SelectedTopicCallout({ topic, onClose, className }, ref) {
    const sentiment = sentimentFromCompound(topic.sentiment);
    const engagementLabel =
      topic.avgEngagement != null ? topic.avgEngagement.toLocaleString() : "—";

    return (
      <ReefCalloutShell
        ref={ref}
        ariaLabel="Selected topic details"
        onClose={onClose}
        className={className}
      >
        <ReefCalloutSourceRow
          label="Topic:"
          value={capitalizeLabel(topic.name)}
          icon={{ kind: "topic", topicName: topic.name }}
        />

        <dl className="reef-post-callout__fields">
          <CalloutField icon={BarChart3} label="Posts" value={topic.postVolume.toLocaleString()} />
          <CalloutField
            icon={MessageSquare}
            label="Sentiment"
            value={sentiment.label}
            valueClassName={sentiment.className}
          />
          <CalloutField icon={Tag} label="Engagement" value={engagementLabel} />
          <CalloutField
            icon={MessagesSquare}
            label="Comments"
            value={String(topic.commentVolume ?? 0)}
          />
        </dl>
      </ReefCalloutShell>
    );
  },
);
