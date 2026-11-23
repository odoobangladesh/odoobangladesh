import { permanentRedirect } from "next/navigation";

/** Marketing alias for the Learning Center hub. */
export default function KnowledgeHubRedirectPage() {
  permanentRedirect("/learning-center");
}
