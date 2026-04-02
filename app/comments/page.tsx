'use client';
import { useState } from 'react';

type Comment = {
  id: string;
  text: string;
  likes: number;
  replies: Comment[];
};

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [showInput, setShowInput] = useState<boolean>(false);

  const updateTree = (
    id: string,
    arr: Comment[],
    isAdding: boolean
  ): Comment[] => {
    return arr.map(com => {
      if (com.id === id) {
        return { ...com, likes: isAdding ? com.likes + 1 : com.likes - 1 };
      }
      if (com.replies.length > 0) {
        return { ...com, replies: updateTree(id, com.replies, isAdding) };
      }
      return com;
    });
  };

  const handleLike = (id: string) => {
    const isAlreadyLiked = likedIds.has(id);

    const newLikedIds = new Set(likedIds);
    if (isAlreadyLiked) newLikedIds.delete(id);
    else newLikedIds.add(id);
    setLikedIds(newLikedIds);

    setComments(prev => updateTree(id, prev, !isAlreadyLiked));
  };

  const renderComments = (arr: Comment[]) =>
    arr.map(com => (
      <div
        key={com.id}
        style={{
          marginBottom: '10px',
          borderLeft: '1px dotted gray',
          paddingLeft: '15px',
        }}
      >
        <p>{com.text}</p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleLike(com.id)}
            style={{ color: likedIds.has(com.id) ? 'red' : 'black' }}
          >
            {likedIds.has(com.id) ? '❤️' : '🤍'} {com.likes}
          </button>
          <button>➕ Add reply</button>
        </div>

        {com.replies.length > 0 && (
          <div style={{ marginLeft: '20px' }}>
            {renderComments(com.replies)}
          </div>
        )}
      </div>
    ));

  return <div>{renderComments(comments)}</div>;
}

const initialComments: Comment[] = [
  {
    id: '1',
    text: 'Next.js — це просто пушка! Middleware спочатку вибісив, але тепер розумію, наскільки це зручно.',
    likes: 15,
    replies: [
      {
        id: '1-1',
        text: 'Згоден, особливо зручно закривати цілі розділи сайту від неавторизованих юзерів одним файлом.',
        likes: 5,
        replies: [
          {
            id: '1-1-1',
            text: 'Головне — не потрапити в нескінченний редирект, як я сьогодні 😂',
            likes: 12,
            replies: [],
          },
        ],
      },
      {
        id: '1-2',
        text: 'А мені більше подобається App Router, ніж старі Pages.',
        likes: 3,
        replies: [],
      },
    ],
  },
  {
    id: '2',
    text: 'Хтось пробував Zustand для великих проектів? Чи краще Redux Toolkit?',
    likes: 8,
    replies: [
      {
        id: '2-1',
        text: 'Zustand набагато легший. Менше бойлерплейту — більше діла.',
        likes: 10,
        replies: [],
      },
    ],
  },
  {
    id: '3',
    text: 'Підкажіть, чи варто вчити React Query, якщо я вже використовую Zustand?',
    likes: 2,
    replies: [
      {
        id: '3-1',
        text: 'Так! Це зовсім про різне. React Query для серверного стану (кешування API), а Zustand — для глобального UI стану.',
        likes: 7,
        replies: [],
      },
    ],
  },
];
