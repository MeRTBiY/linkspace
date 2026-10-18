import { useState } from 'react';
import Modal from './Modal.jsx';

export default function AddCategoryModal({ onClose, onAdd }) {
  const [name, setName] = useState('');
  return (
    <Modal title="NEW CATEGORY" onClose={onClose}>
      <form onSubmit={event => { event.preventDefault(); if (name.trim()) onAdd(name.trim()); }}>
        <label className="block text-sm text-muted">Category name
          <input autoFocus required maxLength={80} className="field" placeholder="Category name..." value={name} onChange={event => setName(event.target.value)} />
        </label>
        <div className="mt-6 flex gap-3">
          <button type="button" className="btn btn-secondary flex-1" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary flex-1" disabled={!name.trim()}>Create</button>
        </div>
      </form>
    </Modal>
  );
}
