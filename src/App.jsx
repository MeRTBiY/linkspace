import { useEffect, useState } from 'react';
import { ChevronRight, FolderOpen, Link as LinkIcon } from 'lucide-react';
import useLocalStorage from './hooks/useLocalStorage.jsx';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import LinkCard from './components/LinkCard.jsx';
import EmptyState from './components/EmptyState.jsx';
import AddCategoryModal from './components/AddCategoryModal.jsx';
import AddLinkModal from './components/AddLinkModal.jsx';

export default function App() {
  const [isDark, setIsDark] = useLocalStorage('linkspace-dark', true);
  const [categories, setCategories] = useLocalStorage('linkspace-categories', []);
  const [selectedId, setSelectedId] = useLocalStorage('linkspace-selected', null);
  const [modal, setModal] = useState(null);
  const [editingLink, setEditingLink] = useState(null);
  const selectedCategory = categories.find(category => category.id === selectedId) ?? null;

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  function addCategory(name) {
    const category = { id: crypto.randomUUID(), name, links: [] };
    setCategories(previous => [...previous, category]);
    setSelectedId(category.id);
    setModal(null);
  }

  function deleteCategory(id) {
    setCategories(previous => previous.filter(category => category.id !== id));
    if (selectedId === id) setSelectedId(null);
  }

  function addLink(values) {
    if (!selectedCategory) return;
    const link = { id: crypto.randomUUID(), ...values };
    setCategories(previous => previous.map(category => category.id === selectedId
      ? { ...category, links: [...category.links, link] } : category));
    setModal(null);
  }

  function editLink(values) {
    if (!selectedCategory || !editingLink) return;
    setCategories(previous => previous.map(category => category.id === selectedId
      ? { ...category, links: category.links.map(link => link.id === editingLink.id
        ? { ...link, ...values } : link) } : category));
    setEditingLink(null);
    setModal(null);
  }

  function deleteLink(id) {
    setCategories(previous => previous.map(category => category.id === selectedId
      ? { ...category, links: category.links.filter(link => link.id !== id) } : category));
  }

  return (
    <div className="flex min-h-dvh w-full min-w-0 flex-col bg-canvas text-ink transition-colors motion-reduce:transition-none md:flex-row">
      <Sidebar categories={categories} selectedId={selectedId} onSelect={setSelectedId} onDelete={deleteCategory} onAdd={() => setModal('category')} />
      <main className="min-w-0 flex-1">
        <Header title={selectedCategory?.name ?? (categories.length ? 'Select category' : 'Category name')}
          isDark={isDark} onToggleTheme={() => setIsDark(previous => !previous)}
          hasCategory={Boolean(selectedCategory)} onAddLink={() => setModal('link')} />
        <section aria-label="Saved links" className="px-4 py-6 sm:px-10">
          {!selectedCategory && (categories.length === 0
            ? <EmptyState icon={FolderOpen} title="NO CATEGORIES YET" actionLabel="Add category" onAction={() => setModal('category')} />
            : <EmptyState icon={ChevronRight} title="SELECT A CATEGORY" />)}
          {selectedCategory && (selectedCategory.links.length === 0
            ? <EmptyState icon={LinkIcon} title="NO LINKS YET" actionLabel="Add link" onAction={() => setModal('link')} />
            : <div className="flex flex-col gap-3">{selectedCategory.links.map(link => <LinkCard key={link.id} link={link} onEdit={() => { setEditingLink(link); setModal('edit'); }} onDelete={() => deleteLink(link.id)} />)}</div>)}
        </section>
      </main>
      {modal === 'category' && <AddCategoryModal onClose={() => setModal(null)} onAdd={addCategory} />}
      {modal === 'link' && selectedCategory && <AddLinkModal onClose={() => setModal(null)} onAdd={addLink} />}
      {modal === 'edit' && selectedCategory && editingLink && <AddLinkModal initialLink={editingLink} onClose={() => { setModal(null); setEditingLink(null); }} onAdd={editLink} />}
    </div>
  );
}
