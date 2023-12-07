// store.js
// import { create } from "zustand";

import create from "zustand";

export const useTagStore = create((set) => ({
  selectedTags: [],
  setSelectedTags: (tags) => set({ selectedTags: tags }),
  addSelectedTag: (tag) =>
    set((state) => ({ selectedTags: [...state.selectedTags, tag] })),
  removeSelectedTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.filter((t) => t !== tag),
    })),
}));

export const clearSelectedTags = () =>
  useTagStore.setState({ selectedTags: [] });
