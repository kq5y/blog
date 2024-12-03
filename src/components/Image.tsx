import type { ImageOutputFormat, ImageQuality } from "astro";
import { getImage } from "astro:assets";
import type { FunctionalComponent } from "preact";
import type { HTMLAttributes } from "preact/compat";

interface Props extends HTMLAttributes<HTMLImageElement> {
  src: string | ImageMetadata;
  format?: ImageOutputFormat;
  width?: number;
  height?: number;
  alt?: string;
  quality?: ImageQuality;
}

export const Image: FunctionalComponent<Props> = async ({
  src,
  width,
  height,
  quality,
  format,
  ...props
}) => {
  const image = await getImage({
    src,
    width,
    height,
    quality,
    format,
  });
  return (
    <img
      {...props}
      src={image.src}
      srcset={image.srcSet.attribute}
      width={image.options.width}
      height={image.options.height}
      loading="lazy"
      decoding="async"
    />
  );
};
