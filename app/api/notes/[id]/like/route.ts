import { notes } from '../../route';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const noteIndex = notes.findIndex(n => n.id === id);

  if (noteIndex === -1) {
    return new Response(JSON.stringify({ error: 'Note not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (Math.random() < 0.3) {
    return new Response(
      JSON.stringify({ error: 'Database connection failed' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  notes[noteIndex].likes += 1;

  return Response.json(notes[noteIndex]);
}
