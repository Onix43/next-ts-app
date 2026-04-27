import { useRef, useState } from 'react';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'Ivan' },
  { id: 2, name: 'Petro' },
  { id: 3, name: 'Olga' },
  { id: 4, name: 'Andrii' },
];

export default function TodoList() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const timerId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedSearch = (value: string) => {
    setLoading(true);
    if (timerId.current) clearTimeout(timerId.current);

    timerId.current = setTimeout(() => {
      setQuery(value);
      setLoading(false);
    }, 500);
  };
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <input
        type="text"
        placeholder="Enter username"
        onChange={e => debouncedSearch(e.target.value)}
      />
      {loading && <p>Loading, please wait...</p>}
      {!loading && filteredUsers.length === 0 && (
        <p>Sorry, no results matched your call</p>
      )}
      <ul>
        {filteredUsers.map(user => (
          <li
            key={user.id}
            onClick={() => {
              if (selectedUsers.includes(user)) {
                setSelectedUsers(prev =>
                  prev.filter(item => item.id !== user.id)
                );
              } else setSelectedUsers(prev => [...prev, user]);
            }}
          >
            <h3>{user.name}</h3>
            {selectedUsers.includes(user)
              ? 'Delete from selected❌'
              : 'Mark as selected✅'}
          </li>
        ))}
      </ul>
    </div>
  );
}
