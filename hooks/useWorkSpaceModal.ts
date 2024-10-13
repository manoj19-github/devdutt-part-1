import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useWorkSpaceModal = () => {
  return useAtom(modalState);
};
