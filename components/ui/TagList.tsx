import { ArrowUpRight } from 'lucide-react';

type Tag = {
  label: string;
  url?: string;
};

interface TagListProps {
  tags: readonly Tag[];
}

const TAG_CLASSES =
  'inline-flex items-center gap-0.5 rounded-full border border-accent/30 bg-accent-soft px-2 py-1 text-xs font-medium leading-4 text-accent';

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag.label}>
          {tag.url ? (
            <a
              href={tag.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${TAG_CLASSES} transition-colors hover:border-accent`}
            >
              {tag.label}
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          ) : (
            <span className={TAG_CLASSES}>{tag.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
