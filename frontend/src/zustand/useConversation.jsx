import { create } from "zustand";

const useConversation = create((set) => ({
  isGroupChat: false,
  setIsGroupChat: (isGroupChat) => set({ isGroupChat }),
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  groupParticipants: [],
  setGroupParticipants: (groupParticipants) => set({ groupParticipants }),
}));

export default useConversation;
