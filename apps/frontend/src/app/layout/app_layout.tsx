'use client';

import React, {useEffect, useState} from "react";
import {Sidebar} from "./sidebar";
import {HeaderMenu} from "@/app/layout/header";
import {useSidebarStore} from '@/stores/global_store';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [ready, setReady] = useState(false);
    const setActiveTab = useSidebarStore(s => s.setActiveTab);
    const setActiveSubTab = useSidebarStore(s => s.setActiveSubTab);

    useEffect(() => {
        // Extract current path: /menu/infrastructure/nginx → ['menu', 'infrastructure', 'nginx']
        const segments = window.location.pathname.split('/').filter(Boolean);

        if (segments[0] === 'menu') {
            const tab = segments[1];         // e.g. infrastructure
            const subTab = segments[2] || null; // e.g. nginx
            setActiveTab(tab);
            setActiveSubTab(subTab);
        }

        // Wait a tick to allow state sync
        setTimeout(() => setReady(true), 50);
    }, [setActiveTab, setActiveSubTab]);

    if (!ready) {
        return (
            <div className="w-full h-screen flex flex-col items-center justify-center text-white text-xl space-y-4">
                <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen w-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
            <div className="h-full flex">
                <Sidebar/>
                <div className="flex-1 flex flex-col overflow-hidden">
                    <HeaderMenu/>
                    <main className="flex-1 p-8 overflow-auto">
                        {children}
                    </main>
                    <footer
                        className="bg-slate-800/90 text-white text-center py-2 text-sm border-t border-white/10">
                        EZ Saga © 2025
                    </footer>
                </div>
            </div>
        </div>
    );

};
