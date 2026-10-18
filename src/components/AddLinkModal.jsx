import { useId, useState } from 'react';
import Modal from './Modal.jsx';
import { normalizeUrl } from '../utils/normalizeUrl.jsx';

export default function AddLinkModal({ onClose, onAdd, initialLink = null }) {
  const [name, setName] = useState(initialLink?.name ?? '');
  const [url, setUrl] = useState(initialLink?.url ?? '');
  const [error, setError] = useState('');
  const errorId = useId();

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !url.trim()) return;
    try {
      const normalized = normalizeUrl(url);
      onAdd({ name: name.trim(), url: normalized });
    } catch { setError('Enter a valid HTTP or HTTPS address, e.g. google.com.'); }
  }

  return (
    <Modal title={initialLink ? 'EDIT LINK' : 'NEW LINK'} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm text-muted">Link name
          <input autoFocus required maxLength={120} className="field" placeholder="Link name..." value={name} onChange={event => setName(event.target.value)} />
        </label>
        <label className="mt-4 block text-sm text-muted">Website address
          <input required type="text" inputMode="url" autoCapitalize="none" spellCheck={false} className="field" placeholder="google.com" value={url}
            aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}
            onChange={event => { setUrl(event.target.value); setError(''); }} />
        </label>
        {error && <p id={errorId} role="alert" className="mt-3 text-sm text-muted">{error}</p>}
        <div className="mt-6 flex gap-3">
          <button type="button" className="btn btn-secondary flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary flex-1" disabled={!name.trim() || !url.trim()}>{initialLink ? 'Save changes' : 'Add'}</button>
        </div>
      </form>
    </Modal>
  );
}
