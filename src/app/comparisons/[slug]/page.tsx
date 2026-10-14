import { metadataFor, pageFor, staticParamsFor } from "@/components/doc-page";

export const generateStaticParams = staticParamsFor("comparisons");
export const generateMetadata = metadataFor("comparisons");
export default pageFor("comparisons");
