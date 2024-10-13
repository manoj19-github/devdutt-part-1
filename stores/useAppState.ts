import { create } from "zustand";
type AppStateTypes = {
  isLoading: boolean;
  loadingMessage: string;
  setIsLoading: (isLoading: boolean) => void;
  loadingType: string;
  setLoadingMessage: (_loadingMessage: string) => void;
  setLoadingType: (_loadingType: string) => void;
};
const useAppState = create<AppStateTypes>((set) => ({
  isLoading: false,
  loadingType: "",
  loadingMessage: "Loading Please wait ...",
  setLoadingType: (_loadingType) => set({ loadingType: _loadingType }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadingMessage: (loadingMessage) => set({ loadingMessage }),
}));
export default useAppState;
