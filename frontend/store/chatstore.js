import { create } from 'zustand';

export const useChatStore = create((set) => ({
  messages: [
    {
      sender: 'lexbot',
      text: "Hi. I'm LexBot. Tell me what happened — in your own words.",
      timestamp: new Date().toISOString(),
    }
  ],
  loading: false,

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, { ...message, timestamp: new Date().toISOString() }]
    }));
  },

  setLoading: (loadingState) => {
    set({ loading: loadingState });
  },

  clearChat: () => {
    set({
      messages: [
        {
          sender: 'lexbot',
          text: "Hi. I'm LexBot. Tell me what happened — in your own words.",
          timestamp: new Date().toISOString(),
        }
      ],
      loading: false
    });
  }
}));
