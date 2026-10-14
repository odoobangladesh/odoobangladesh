import { metadataFor, pageFor, staticParamsFor } from "@/components/doc-page";

export const generateStaticParams = staticParamsFor("modules");
export const generateMetadata = metadataFor("modules");
export default pageFor("modules");
