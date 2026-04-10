import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

type LinkedRichTextProps = {
  text: string;
  className?: string;
};

const LINK_PATTERN = /\[([^\]]+)\]\((\/[^)]+)\)/g;

function renderLinkedText(text: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(LINK_PATTERN)) {
    const fullMatch = match[0];
    const label = match[1];
    const href = match[2];
    const startIndex = match.index ?? 0;

    if (startIndex > lastIndex) {
      nodes.push(
        <Fragment key={`text-${startIndex}`}>
          {text.slice(lastIndex, startIndex)}
        </Fragment>,
      );
    }

    nodes.push(
      <Link
        key={`link-${startIndex}-${href}`}
        href={href}
        className="font-medium text-primary hover:underline"
      >
        {label}
      </Link>,
    );

    lastIndex = startIndex + fullMatch.length;
  }

  if (lastIndex < text.length) {
    nodes.push(
      <Fragment key={`text-tail-${lastIndex}`}>{text.slice(lastIndex)}</Fragment>,
    );
  }

  return nodes;
}

export default function LinkedRichText({
  text,
  className,
}: LinkedRichTextProps) {
  return <p className={className}>{renderLinkedText(text)}</p>;
}
