import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

export default function Modal({ title, onClose, children }) {
  const ref = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog ref={ref} aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-[20px] border border-line bg-dialog p-6 text-ink shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 id={titleId} className="text-base font-bold tracking-[0.16em]">{title}</h2>
        <button type="button" onClick={onClose} aria-label="Close dialog" className="flex size-11 shrink-0 items-center justify-center rounded-xl text-muted hover:bg-button"><X size={18} /></button>
      </div>
      {children}
    </dialog>
  );
}
