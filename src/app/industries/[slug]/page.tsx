import { metadataFor, pageFor, staticParamsFor } from "@/components/doc-page";

export const generateStaticParams = staticParamsFor("industries");
export const generateMetadata = metadataFor("industries");
export default pageFor("industries");
