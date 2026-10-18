import { X } from 'lucide-react';

export default function CategoryItem({ category, isActive, onSelect, onDelete }) {
  return (
    <div className={`group mb-1 flex min-w-0 items-center rounded-xl border ${isActive ? 'border-accent bg-active' : 'border-transparent hover:bg-button'}`}>
      <button onClick={onSelect} aria-current={isActive ? 'true' : undefined}
        className={`min-h-11 min-w-0 flex-1 truncate rounded-xl px-3 text-left text-sm ${isActive ? 'font-semibold text-ink' : 'text-muted'}`}>
        {category.name}
      </button>
      <button onClick={onDelete} aria-label={`Delete category ${category.name}`}
        className="flex size-11 shrink-0 items-center justify-center rounded-xl text-faint hover:text-ink">
        <X size={14} />
      </button>
    </div>
  );
}
