import { create } from 'zustand';

interface Message {
  id: number;
  text: string;
}

interface ChatStore {
  messages: Message[];
  socket: WebSocket | null;

  connect: () => void;
  sendMessage: (text: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  socket: null,

  connect: () => {
    if (get().socket) return;
    const socket = new WebSocket('ws://localhost:3001');

    socket.onmessage = event => {
      const data = JSON.parse(event.data);

      if (data.type === 'INIT') {
        set({ messages: data.payload });
      }

      if (data.type === 'NEW_MESSAGE') {
        set(state => ({
          messages: [...state.messages, data.payload],
        }));
      }
    };
    set({ socket });
  },
  sendMessage: text => {
    const { socket } = get();

    socket?.send(
      JSON.stringify({ type: 'SEND_MESSAGE', payload: { text: text } })
    );
  },
}));
