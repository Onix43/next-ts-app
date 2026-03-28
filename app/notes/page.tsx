'use client';

import { useNoteStore } from '@/lib/notesStore/noteStore';
import { useEffect } from 'react';

export default function NotesPage() {
  const { notes, loading, error, fetchNotes, likeNote } = useNoteStore();

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      {loading && <p>Loading, please wait...</p>}
      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>❤️ {note.likes}</p>
          <button onClick={() => likeNote(note.id)} disabled={loading === true}>
            Like
          </button>
        </div>
      ))}
      {error && <p>Error occured: {error}</p>}
    </div>
  );
}
