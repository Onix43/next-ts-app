export interface User {
  id: string;
  email: string;
  password: string;
}
export const users: User[] = [
  { id: '1', email: 'test@test.com', password: '123456' },
];
