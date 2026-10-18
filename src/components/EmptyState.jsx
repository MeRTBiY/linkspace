import { Plus } from 'lucide-react';

export default function EmptyState({ icon: Icon, title, actionLabel, onAction }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-5 py-12 text-center">
      <Icon size={48} strokeWidth={1.2} className="text-faint" aria-hidden="true" />
      <p className="text-sm tracking-[0.18em] text-muted">{title}</p>
      {actionLabel && <button className="btn btn-secondary" onClick={onAction}><Plus size={16} />{actionLabel}</button>}
    </div>
  );
}
