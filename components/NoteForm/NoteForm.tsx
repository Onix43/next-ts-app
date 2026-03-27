'use client';
import { useNotesStore } from '@/lib/notesStore/noteStore';
import { useRouter } from 'next/navigation';
import { useId } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function NoteForm() {
  const id = useId();

  const { draft, setDraft, clearDraft } = useNotesStore();

  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const note = {
      title,
      content,
    };
    console.log(note); //Тут мала бути відправка на бекенд
    clearDraft();
    router.push('/notes');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
  };

  const debounced = useDebouncedCallback(handleChange, 300);
  return (
    <form action={handleSubmit}>
      <label htmlFor={`${id}-title`}>Title</label>
      <input
        type="text"
        name="title"
        id={`${id}-title`}
        onChange={debounced}
        value={draft.title}
      />
      <label htmlFor={`${id}-content`}>Content</label>
      <textarea
        name="content"
        id={`${id}-content`}
        onChange={debounced}
        value={draft.content}
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
