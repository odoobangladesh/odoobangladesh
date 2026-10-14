import { metadataFor, pageFor, staticParamsFor } from "@/components/doc-page";

export const generateStaticParams = staticParamsFor("landings");
export const generateMetadata = metadataFor("landings");
export default pageFor("landings");
