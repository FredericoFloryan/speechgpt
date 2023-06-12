import create from 'zustand';

const useContentStore = create<ContentStore>(set => ({
  sendMessages: false,
  setSendMessages: value => set({ sendMessages: value }),
}));

interface ContentStore {
  sendMessages: boolean;
  setSendMessages: (value: boolean) => void;
}

export default useContentStore;
