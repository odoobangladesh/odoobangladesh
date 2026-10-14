import { permanentRedirect } from "next/navigation";

// Legacy keyword slug. The /training/functional hub is the canonical page (blueprint WS-A).
export default function Page() {
  permanentRedirect("/training/functional");
}
