import { resolveVideoEmbed } from "@/lib/video";

/** Renders a blog video when frontmatter `video` is set; otherwise null. */
export function DocVideo({
  src,
  title,
}: {
  src?: string;
  title: string;
}) {
  if (!src) return null;
  const embed = resolveVideoEmbed(src);
  if (!embed) return null;

  return (
    <figure className="mt-8 overflow-hidden border border-line bg-surface">
      <div className="aspect-video w-full">
        {embed.kind === "iframe" ? (
          <iframe
            src={embed.src}
            title={title}
            className="h-full w-full"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <video
            src={embed.src}
            controls
            className="h-full w-full"
            preload="metadata"
          >
            Your browser does not support embedded video.
          </video>
        )}
      </div>
    </figure>
  );
}
