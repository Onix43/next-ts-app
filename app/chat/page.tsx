'use client';

import { useChatStore } from '@/lib/chatStore/chatStore';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const { messages, connect, sendMessage } = useChatStore();
  const [text, setText] = useState('');

  useEffect(() => {
    connect();
  }, []);

  return (
    <div>
      <h1>Chat</h1>

      <div>
        {messages.map(msg => (
          <p key={msg.id}>{msg.text}</p>
        ))}
      </div>

      <input value={text} onChange={e => setText(e.target.value)} />

      <button
        onClick={() => {
          sendMessage(text);
          setText('');
        }}
      >
        Send
      </button>
    </div>
  );
}
