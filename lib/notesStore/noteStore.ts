import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreateNoteValues {
  title: string;
  content: string;
}

interface NoteStore {
  draft: CreateNoteValues;
  setDraft: (v: CreateNoteValues) => void;
  clearDraft: () => void;
}

const initialValues = {
  title: '',
  content: '',
};

export const useNotesStore = create<NoteStore>()(
  persist(
    set => ({
      draft: initialValues,
      setDraft: values => set({ draft: values }),
      clearDraft: () => set({ draft: initialValues }),
    }),
    {
      name: 'notes-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
