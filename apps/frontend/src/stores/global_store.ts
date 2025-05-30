import { create } from 'zustand';
import { useRouter } from "next/navigation";

interface UIState {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const useSidebarStore = create<UIState>((set) => ({
    activeTab: 'systems',
    setActiveTab: (name: string) => {
        set({ activeTab: name });
    },
}));