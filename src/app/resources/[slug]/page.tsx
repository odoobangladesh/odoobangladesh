import { metadataFor, pageFor, staticParamsFor } from "@/components/doc-page";

export const generateStaticParams = staticParamsFor("resources");
export const generateMetadata = metadataFor("resources");
export default pageFor("resources");
