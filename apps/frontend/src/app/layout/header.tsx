import React from "react";
import { Bell, Settings } from "lucide-react";

export const HeaderMenu: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl border-b border-white/10 px-8 py-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl text-white font-semibold">EZ Saga Admin</h1>
                <div className="flex items-center gap-4">
                    <button className="relative p-2 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all">
                        <Bell size={18} className="text-white/60" />
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></div>
                    </button>
                    <div className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">JD</span>
                        </div>
                        <span className="text-white text-sm">Lam Le</span>
                        <Settings size={16} className="text-white/50 hover:text-white cursor-pointer" />
                    </div>
                </div>
            </div>
        </header>
    );
};
