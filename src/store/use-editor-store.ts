import { create } from "zustand";

import { type Editor } from "@tiptap/react";

interface EditorStateProp {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void;
}
export const useEditorStore = create<EditorStateProp>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor }),
}));
