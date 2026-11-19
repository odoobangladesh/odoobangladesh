/**
 * Normalize common video URLs for blog embeds.
 * Returns null when the value is empty or not a usable media/embed URL.
 */

export type VideoEmbed =
  | { kind: "iframe"; src: string }
  | { kind: "file"; src: string };

export function resolveVideoEmbed(raw: string): VideoEmbed | null {
  const value = raw.trim();
  if (!value) return null;

  if (/\.(mp4|webm|ogg)(\?|$)/i.test(value)) {
    if (value.startsWith("/") || /^https?:\/\//i.test(value)) {
      return { kind: "file", src: value };
    }
    return null;
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();

  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    if (!id) return null;
    return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    if (url.pathname.startsWith("/embed/")) {
      return { kind: "iframe", src: `https://www.youtube.com${url.pathname}` };
    }
    if (url.pathname.startsWith("/shorts/")) {
      const id = url.pathname.split("/")[2];
      if (!id) return null;
      return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    const id = url.searchParams.get("v");
    if (!id) return null;
    return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }

  if (host === "vimeo.com") {
    const id = url.pathname.split("/").filter(Boolean)[0];
    if (!id || !/^\d+$/.test(id)) return null;
    return { kind: "iframe", src: `https://player.vimeo.com/video/${id}` };
  }

  if (host === "player.vimeo.com" && url.pathname.startsWith("/video/")) {
    return { kind: "iframe", src: `https://player.vimeo.com${url.pathname}` };
  }

  return null;
}
