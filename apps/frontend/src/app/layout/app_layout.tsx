import React from "react";
import {Sidebar} from "./sidebar";
import {HeaderMenu} from "@/app/layout/header";

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({children}) => {
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
                    <footer className="bg-slate-800/90 text-white text-center py-2 text-sm border-t border-white/10">
                        EasySaga © 2025
                    </footer>
                </div>
            </div>
        </div>
    );
};
