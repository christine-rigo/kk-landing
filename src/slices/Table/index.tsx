import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicRichText } from "@prismicio/react";

/**
 * Props for `Table`.
 */
export type TableProps = SliceComponentProps<Content.TableSlice>;

/**
 * Component for "Table" Slices.
 */
const Table = ({ slice }: TableProps): JSX.Element => {

  const { heading_content, rows } = slice.primary;

  return (
    <section className="mb-6 md:mb-8">
      <div className="container">
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
          [&_h6]:font-bold">
          <PrismicRichText field={heading_content} />
        </div>
        <div className="border border-kk-midnight-100 mt-6 md:mt-8">
          {rows.map((item) => (
            <>
              <div className="border-b border-kk-midnight-100 last:border-b-0 flex md:grid md:grid-cols-4 -- md:[&_p]:text-xl">
                <div className="px-2 py-3 border-r border-kk-midnight-100 font-bold md:col-span-1 max-md:flex-none max-md:w-32">
                  <PrismicRichText field={item.title} />
                </div>
                <div className="px-2 py-3 md:col-span-3">
                  <PrismicRichText field={item.description} />
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Table;
