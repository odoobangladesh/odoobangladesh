import { metadataFor, pageFor, staticParamsFor } from "@/components/doc-page";

export const generateStaticParams = staticParamsFor("blog");
export const generateMetadata = metadataFor("blog");
export default pageFor("blog");
