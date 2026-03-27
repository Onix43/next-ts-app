import NoteForm from '@/components/NoteForm/NoteForm';

export default function NewNotePage() {
  return (
    <>
      <h1>Note creation page</h1>
      <div>
        <p>Enter note values below</p>
        <NoteForm />
      </div>
    </>
  );
}
