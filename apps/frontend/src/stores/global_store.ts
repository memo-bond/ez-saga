import { create } from 'zustand';

interface UIState {
    activeTab: string | null;         // e.g., "infrastructure"
    activeSubTab: string | null; // e.g., "kafka"
    setActiveTab: (tab: string) => void;
    setActiveSubTab: (subTab: string | null) => void;
}

export const useSidebarStore = create<UIState>((set) => ({
    activeTab: null,
    activeSubTab: null,
    setActiveTab: (tab: string) => set({ activeTab: tab, activeSubTab: null }),
    setActiveSubTab: (subTab: string | null) => set({ activeSubTab: subTab }),
}));
