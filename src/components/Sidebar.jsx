import { Plus } from 'lucide-react';
import CategoryItem from './CategoryItem.jsx';

export default function Sidebar({ categories, selectedId, onSelect, onDelete, onAdd }) {
  return (
    <aside className="w-full shrink-0 border-b border-line bg-panel p-4 md:sticky md:top-0 md:h-dvh md:w-60 md:overflow-y-auto md:border-r md:border-b-0">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-xs font-bold tracking-[0.22em] text-muted">CATEGORIES</h2>
        <button onClick={onAdd} aria-label="Add category" className="btn btn-secondary size-11 p-0"><Plus size={17} /></button>
      </div>
      <nav aria-label="Categories">
        {categories.length === 0 && <p className="py-4 text-center text-sm text-faint">Empty</p>}
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} isActive={selectedId === category.id}
            onSelect={() => onSelect(category.id)} onDelete={() => onDelete(category.id)} />
        ))}
      </nav>
    </aside>
  );
}
