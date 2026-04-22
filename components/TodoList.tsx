'use client';
import { SetStateAction, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const todoArray = [
  {
    id: '1',
    text: 'Some text',
    completed: true,
  },
  {
    id: '2',
    text: 'Some text v2',
    completed: true,
  },
  {
    id: '3',
    text: 'Some text v3',
    completed: false,
  },
];

export default function TodoList() {
  const [todoList, setTodoList] = useState(todoArray); // зробив так бо не передаю пропсом
  const [query, setQuery] = useState('');

  const toggleCompleted = (id: string) => {
    setTodoList(
      todoList.map(todo => {
        if (id === todo.id) return { ...todo, completed: !todo.completed };
        return todo;
      })
    );
  };
  const handleDelete = (id: string) => {
    setTodoList(todoList.filter(todo => todo.id !== id));
  };
  const addTodo = () => {
    const customId = uuidv4();
    setTodoList([...todoList, { id: customId, text: query, completed: false }]);
    setQuery('');
  };
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Enter todo text..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={addTodo}>Add todo</button>
      </div>
      <ul>
        {todoList.map(todo => (
          <li
            key={todo.id}
            style={{ backgroundColor: todo.completed ? 'green' : 'false' }}
          >
            <h3>{todo.text}</h3>
            <button onClick={() => toggleCompleted(todo.id)}>Toggle</button>
            <button onClick={() => handleDelete(todo.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
