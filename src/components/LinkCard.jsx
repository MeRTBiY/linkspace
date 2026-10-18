import { Pencil, X } from 'lucide-react';
import SiteIcon from './SiteIcon.jsx';

export default function LinkCard({ link, onEdit, onDelete }) {
  return (
    <article className="flex min-w-0 items-center rounded-2xl border border-line bg-card transition-colors hover:bg-card-hover motion-reduce:transition-none">
      <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl p-3 sm:p-4">
        <SiteIcon url={link.url} />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{link.name}</span>
          <span className="mt-1 block truncate text-sm text-muted">{link.url}</span>
        </span>
      </a>
      <div className="mr-1 flex shrink-0 sm:mr-2">
        <button onClick={onEdit} aria-label={`Edit link ${link.name}`} title="Edit link" className="flex size-11 items-center justify-center rounded-xl text-muted hover:bg-button hover:text-ink"><Pencil size={16} /></button>
        <button onClick={onDelete} aria-label={`Delete link ${link.name}`} title="Delete link" className="flex size-11 items-center justify-center rounded-xl text-faint hover:bg-button hover:text-ink"><X size={16} /></button>
      </div>
    </article>
  );
}
