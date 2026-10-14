import { permanentRedirect } from "next/navigation";

// Legacy keyword slug. The /training/technical hub is the canonical page (blueprint WS-A).
export default function Page() {
  permanentRedirect("/training/technical");
}
