// A passthrough: pages arrive without a transition, so navigation feels immediate.
export default function Template({ children }: { children: React.ReactNode }) {
  return children;
}
