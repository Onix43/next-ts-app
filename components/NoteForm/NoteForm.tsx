'use client';
import {
  CreateNoteValues,
  SaveStatus,
  useNotesStore,
} from '@/lib/notesStore/noteStore';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useId } from 'react';
import { useDebouncedCallback } from 'use-debounce';

interface NoteFormProps {
  setStatus: Dispatch<SetStateAction<SaveStatus>>;
}

export default function NoteForm({ setStatus }: NoteFormProps) {
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

  const debouncedSave = useDebouncedCallback(async draft => {
    try {
      setStatus('saving');

      const delay = (ms: number) =>
        new Promise(resolve => setTimeout(resolve, ms));

      await delay(500); // Імітація запиту бо немає ендпоінтів
      console.log(draft);
      setStatus('saved');
    } catch {
      setStatus('error');
    }
  }, 500);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDraft({ ...draft, [e.target.name]: e.target.value });
    debouncedSave(draft);
  };
  return (
    <form action={handleSubmit}>
      <label htmlFor={`${id}-title`}>Title</label>
      <input
        type="text"
        name="title"
        id={`${id}-title`}
        onChange={handleChange}
        value={draft.title}
      />
      <label htmlFor={`${id}-content`}>Content</label>
      <textarea
        name="content"
        id={`${id}-content`}
        onChange={handleChange}
        value={draft.content}
      ></textarea>
      <button type="submit">Send</button>
    </form>
  );
}
