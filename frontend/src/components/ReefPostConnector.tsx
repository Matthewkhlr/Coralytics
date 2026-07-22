import { cn } from "@/lib/utils";

type Point = { x: number; y: number };

type ReefPostConnectorProps = {
  from: Point;
  to: Point;
  className?: string;
};

export function ReefPostConnector({ from, to, className }: ReefPostConnectorProps) {
  const elbowY = to.y;
  const path = `M ${from.x} ${from.y} L ${from.x} ${elbowY} L ${to.x} ${elbowY}`;

  return (
    <svg
      className={cn("reef-post-connector", className)}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="reef-connector-beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.45" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
        </linearGradient>
      </defs>
      <path d={path} className="reef-post-connector__beam" />
      <path d={path} className="reef-post-connector__line" />
    </svg>
  );
}

export type { Point as ConnectorPoint };
