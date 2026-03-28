export const notes = [
  { id: '1', title: 'First note', likes: 0 },
  { id: '2', title: 'Second note', likes: 5 },
];

export async function GET() {
  return Response.json(notes);
}