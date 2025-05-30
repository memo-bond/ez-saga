import React from "react";
import {Home, Database, Network, Activity, Users, Settings, Server} from "lucide-react";
import {useSidebarStore} from "@/stores/global_store";
import {useRouter} from "next/navigation";

export const Sidebar: React.FC = () => {
    const activeTab = useSidebarStore((state) => state.activeTab);
    const setActiveTab = useSidebarStore((state) => state.setActiveTab);
    const router = useRouter();

    const menuItems = [
        {id: "dashboard", label: "Dashboard", icon: Home},
        {id: "systems", label: "Systems", icon: Database},
        {id: "services", label: "Services", icon: Server},
        {id: "network", label: "Network", icon: Network},
        {id: "monitoring", label: "Monitoring", icon: Activity},
        {id: "users", label: "Users", icon: Users},
        {id: "settings", label: "Settings", icon: Settings},
    ];

    return (
        <div
            className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/10 flex flex-col">
            {/* ... (unchanged logo and footer code) ... */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map(({id, label, icon: Icon}) => {
                    const isActive = activeTab === id;
                    return (
                        <button
                            key={id}
                            onClick={() => {
                                setActiveTab(id);
                                router.push("/menu/" + id);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                                isActive
                                    ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                    : "text-white/60 hover:text-white hover:bg-white/5"
                            }`}
                        >
                            <Icon size={18} className={isActive ? "text-cyan-400" : ""}/>
                            <span className="font-medium">{label}</span>
                            {isActive && <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>}
                        </button>
                    );
                })}
            </nav>
            {/* ...footer unchanged... */}
        </div>
    );
};
