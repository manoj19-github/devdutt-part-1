import { create } from "zustand";
type AppStateTypes = {
  isLoading: boolean;
  loadingMessage: string;
  setIsLoading: (isLoading: boolean) => void;
  setLoadingMessage: (loadingMessage: string) => void;
};
const useAppState = create<AppStateTypes>((set) => ({
  isLoading: false,
  loadingMessage: "Loading Please wait ...",
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadingMessage: (loadingMessage) => set({ loadingMessage }),
}));
export default useAppState;
