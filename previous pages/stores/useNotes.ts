'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Note = {
  id: string;
  title: string;
  body: string;
  updatedAt: number;
};

type NotesState = {
  notes: Note[];
  draft: Partial<Note>;
  addNote: (n: Note) => void;
  updateNote: (id: string, patch: Partial<Note>) => void;
  setDraft: (d: Partial<Note>) => void;
};

export const useNotes = create<NotesState>()(
  persist(
    set => ({
      notes: [],
      draft: {},
      addNote: n => set(s => ({ notes: [n, ...s.notes] })),
      updateNote: (id, patch) =>
        set(s => ({
          notes: s.notes.map(n => (n.id === id ? { ...n, ...patch } : n)),
        })),
      setDraft: d => set(() => ({ draft: d })),
    }),
    { name: 'notes-storage' }
  )
);
