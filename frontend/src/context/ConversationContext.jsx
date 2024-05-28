import { create } from "zustand";

const useConversationContext = create((set) => ({
  conversations: [],
  setConversations: (conversations) => set({ conversations }),
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  // updateBears: (newBears) => set({ bears: newBears }),
}));

export default useConversationContext;
