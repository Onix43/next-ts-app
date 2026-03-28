import axios from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Note = {
  id: string;
  title: string;
  likes: number;
};

interface NoteStore {
  notes: Note[];
  loading: boolean;
  error: string | null;

  fetchNotes: () => Promise<void>;
  likeNote: (id: string) => Promise<void>;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],
      loading: false,
      error: null,

      fetchNotes: async () => {
        set({ error: null, loading: true });
        try {
          const response = await axios.get(`/api/notes`);
          set({ notes: response.data, loading: false });
        } catch (err) {
          set({ error: 'Failed to fetch notes', loading: false });
        }
      },
      likeNote: async id => {
        set({ error: null, loading: true });
        const oldNotes = get().notes;
        set(state => ({
          notes: state.notes.map(n =>
            n.id === id ? { ...n, likes: n.likes + 1 } : n
          ),
        }));
        try {
          await axios.post(`/api/notes/${id}/like`, id);
          set({ loading: false });
        } catch (err) {
          console.log('Axios error', err);
          set({ notes: oldNotes, error: 'Failed to like', loading: false });
        }
      },
    }),
    {
      name: 'notes-draft',
      partialize: state => ({
        notes: state.notes,
      }),
    }
  )
);
