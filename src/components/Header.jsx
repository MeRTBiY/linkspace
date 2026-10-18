import { Moon, Plus, Sun } from 'lucide-react';

export default function Header({ title, isDark, onToggleTheme, onAddLink, hasCategory }) {
  return (
    <header className="mx-4 flex flex-wrap items-center justify-between gap-5 border-b border-line py-6 sm:mx-10">
      <h1 className="min-w-0 max-w-full text-2xl font-extrabold tracking-[0.12em] break-words uppercase sm:text-4xl">{title}</h1>
      <div className="flex shrink-0 flex-wrap gap-3">
        <button className="btn btn-secondary" onClick={onToggleTheme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>
          {isDark ? <Sun size={16} /> : <Moon size={16} />}{isDark ? 'Light' : 'Dark'}
        </button>
        {hasCategory && <button className="btn btn-primary" onClick={onAddLink}><Plus size={16} />Add link</button>}
      </div>
    </header>
  );
}
