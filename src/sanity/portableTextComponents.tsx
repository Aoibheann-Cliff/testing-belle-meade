import Image from "next/image";
import Link from "next/link";
import { PortableTextComponents } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

export const components: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value ? (
        <Image
          className="rounded-lg not-prose w-full h-auto"
          src={urlFor(value)
            .width(600)
            .height(400)
            .quality(80)
            .auto("format")
            .url()}
          alt={value?.alt || ""}
          width={600}
          height={400}
        />
      ) : null,
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const isExternal =
        href.startsWith("http://") || href.startsWith("https://");

      if (isExternal) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-blue-600"
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className="underline hover:text-blue-600">
          {children}
        </Link>
      );
    },
  },
};
