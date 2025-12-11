'use client';
import { useNotes } from '@/app/stores/useNotes';
import { useEffect, useState } from 'react';

function useDebounced<T>(value: T, delay: number) {
  const [data, setData] = useState<T>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(value);
    }, delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return data;
}

export default function Page() {
  const { draft, setDraft } = useNotes();
  const debounced = useDebounced(draft, 700);

  useEffect(() => {
    const saved = localStorage.getItem('notes-draft');
    if (saved) {
      setDraft(JSON.parse(saved));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('notes-draft', JSON.stringify(debounced));
  }, [debounced]);

  return (
    <div>
      <textarea
        value={draft.title || ''}
        onChange={e => setDraft({ ...draft, title: e.target.value })}
      />
      <button
        onClick={() => {
          if (!draft.title) return;
          setDraft(debounced);
        }}
      >
        Save
      </button>
    </div>
  );
}
