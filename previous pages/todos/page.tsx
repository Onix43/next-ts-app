import { useNotes } from '../stores/useNotes';

export default function NotesList() {
  const notes = useNotes(s => s.notes);
  return (
    <ul>
      {notes.map(n => (
        <li key={n.id}>{n.title}</li>
      ))}
    </ul>
  );
}
