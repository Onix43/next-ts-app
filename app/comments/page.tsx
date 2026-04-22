'use client';
import CommentInput from '@/components/CommentInput/CommentInput';
import { useState } from 'react';

export type Comment = {
  id: string;
  text: string;
  likes: number;
  replies: Comment[];
};

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [commentIds, setCommentIds] = useState<Set<string>>(new Set());
  const [redactionIds, setRedactionIds] = useState<Set<string>>(new Set());
  const [redactionText, setRedactionText] = useState<string>('');

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

  const handleDelete = (id: string) => {
    const deleteFromTree = (id: string, arr: Comment[]): Comment[] => {
      return arr
        .filter(comment => comment.id !== id)
        .map(comment => {
          if (comment.replies.length > 0) {
            return {
              ...comment,
              replies: deleteFromTree(id, comment.replies),
            };
          }
          return comment;
        });
    };
    setComments(deleteFromTree(id, comments));
  };

  const toggleInput = (id: string) => {
    const isAlreadyInput = commentIds.has(id);

    const newInputIds = new Set(commentIds);
    if (isAlreadyInput) newInputIds.delete(id);
    else newInputIds.add(id);
    setCommentIds(newInputIds);
  };

  const toggleRedaction = (id: string, text: string) => {
    const isAlreadyRedaction = redactionIds.has(id);

    const newRedactionIds = new Set(redactionIds);
    if (isAlreadyRedaction) {
      newRedactionIds.delete(id);
      setRedactionText('');
    } else {
      newRedactionIds.add(id);
      setRedactionText(text);
    }
    setRedactionIds(newRedactionIds);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    // Знаю що це "bad practice" робити це через контрольовані елементи, але зробив так щоб показати що розумію як зе зробити, але було лінь вже робити ще один компонент😅
    setRedactionText(e.target.value);
    const updateTree = (id: string, arr: Comment[]): Comment[] => {
      return arr.map(com => {
        if (com.id === id) {
          return { ...com, text: redactionText };
        }
        if (com.replies.length > 0) {
          return { ...com, replies: updateTree(id, com.replies) };
        }
        return com;
      });
    };
    setComments(updateTree(id, comments));
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
        {redactionIds.has(com.id) ? (
          <input
            type="text"
            value={redactionText}
            onChange={e => handleChange(e, com.id)}
          />
        ) : (
          <p>{com.text}</p>
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => handleLike(com.id)}
            style={{ color: likedIds.has(com.id) ? 'red' : 'black' }}
          >
            {likedIds.has(com.id) ? '❤️' : '🤍'} {com.likes}
          </button>
          <button onClick={() => toggleInput(com.id)}>
            {commentIds.has(com.id) ? 'Hide' : '➕ Add reply'}
          </button>
          <button onClick={() => handleDelete(com.id)}>Delete ❌</button>
          <button onClick={() => toggleRedaction(com.id, com.text)}>
            {redactionIds.has(com.id) ? 'Save' : '✏️ Edit'}
          </button>
        </div>
        {commentIds.has(com.id) && (
          <CommentInput
            comments={comments}
            setComments={setComments}
            id={com.id}
            toggleInput={toggleInput}
          />
        )}

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
