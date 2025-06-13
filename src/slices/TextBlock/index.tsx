import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `TextBlock`.
 */
export type TextBlockProps = SliceComponentProps<Content.TextBlockSlice>;

/**
 * Component for "TextBlock" Slices.
 */
const TextBlock = ({ slice }: TextBlockProps): JSX.Element => {
  const { title, title_image, content } = slice.primary;

  return (
    <section className="mb-6 md:mb-8">
      <div className="container">
        {title && (
          <div className="flex items-center flex-wrap max-md:justify-center gap-4 mb-6 md:mb-10">
            <h1 className="font-bold text-2xl md:text-5xl">{title}</h1>
            {title_image && <span className="font-bold text-2xl md:text-5xl">-</span>}
            {title_image && (
              <img
                className="max-md:max-w-32"
                alt={title_image.alt || ''}
                src={title_image.url || ''}
              />
            )}
          </div>
        )}
        <div className="space-y-6 md:space-y-8 md:[&_p]:text-xl [&_ul]:space-y-1 md:[&_ul]:text-xl [&_ul]:list-disc [&_ul]:pl-8 [&_ol]:space-y-1 md:[&_ol]:text-xl [&_ol]:list-decimal [&_ol]:pl-8 [&_b]:font-bold [&_a]:font-bold [&_a]:underline
          md:[&_h1]:text-4xl 
          md:[&_h2]:text-3xl 
          md:[&_h3]:text-2xl 
          md:[&_h4]:text-xl 
          md:[&_h5]:text-lg 
          md:[&_h6]:text-base 
          [&_h1]:text-3xl 
          [&_h2]:text-2xl 
          [&_h3]:text-xl 
          [&_h4]:text-lg 
          [&_h5]:text-base 
          [&_h6]:text-sm 
          [&_h1]:font-bold 
          [&_h2]:font-bold 
          [&_h3]:font-bold 
          [&_h4]:font-bold 
          [&_h5]:font-bold 
          [&_h6]:font-bold"
        >
          <PrismicRichText field={content} />
        </div>
      </div>
    </section>
  );
};

export default TextBlock;

