import React from "react";
import {
    Activity,
    CircuitBoard,
    Cloud,
    Database,
    Home,
    LucideIcon,
    Network,
    ChevronRight, ChevronDown,
    Server,
    Settings,
    Users,
    Waves
} from "lucide-react";
import {useSidebarStore} from "@/stores/global_store";
import {useRouter} from "next/navigation";

export interface MenuItem {
    id: string;
    label: string;
    icon: LucideIcon;
    children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {id: "dashboard", label: "Dashboard", icon: Home},
    {id: "systems", label: "Systems", icon: Database},
    {id: "services", label: "Services", icon: Server},
    {
        id: "infrastructure",
        label: "Infrastructure",
        icon: Cloud,
        children: [
            { id: "kafka", label: "Kafka", icon: CircuitBoard },
            { id: "redis", label: "Redis", icon: Database },
        ],
    },
    {id: "network", label: "Network", icon: Network,
        children: [
            { id: "nginx", label: "Nginx", icon: Waves },
        ],},
    {id: "monitoring", label: "Monitoring", icon: Activity},
    {id: "users", label: "Users", icon: Users},
    {id: "settings", label: "Settings", icon: Settings},
];

export const Sidebar: React.FC = () => {
    const activeTab = useSidebarStore((state) => state.activeTab);
    const subActiveTab = useSidebarStore((state) => state.activeSubTab);
    const setActiveTab = useSidebarStore((state) => state.setActiveTab);
    const setSubActiveTab = useSidebarStore((state) => state.setActiveSubTab);
    const router = useRouter();

    return (
        <div className="w-64 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-white/10 flex flex-col">
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map(({ id, label, icon: Icon, children }) => {
                    const isActive = activeTab === id;
                    const hasChildren = !!children;

                    return (
                        <div key={id}>
                            <button
                                onClick={() => {
                                    setActiveTab(id);
                                    if (!hasChildren) {
                                        router.push(`/menu/${id}`);
                                    }
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                                    isActive
                                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icon size={18} className={isActive ? "text-cyan-400" : ""} />
                                <span className="font-medium">{label}</span>

                                {/* 👇 Show arrow if it has children */}
                                {hasChildren && (
                                    isActive ? (
                                        <ChevronDown size={16} className="text-cyan-300" />
                                    ) : (
                                        <ChevronRight size={16} className="text-white/40 group-hover:text-white" />
                                    )
                                )}

                                {!hasChildren && isActive && (
                                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                                )}
                            </button>

                            {/* Submenu block */}
                            {children && isActive && (
                                <div className="ml-6 mt-1 space-y-1">
                                    {children.map(({ id: childId, label: childLabel, icon: ChildIcon }) => {
                                        const isSubActive = subActiveTab === childId;

                                        return (
                                            <button
                                                key={childId}
                                                onClick={() => {
                                                    setActiveTab(id);
                                                    setSubActiveTab(childId);
                                                    router.push(`/menu/${id}/${childId}`);
                                                }}
                                                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                                                    isSubActive
                                                        ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                                                        : "text-white/60 hover:text-white hover:bg-white/5"
                                                        // ? "bg-cyan-700/30 text-cyan-300"
                                                        // : "text-white/50 hover:text-white hover:bg-white/5"
                                                }`}
                                            >
                                                <ChildIcon size={16} />
                                                <span>{childLabel}</span>
                                                {isSubActive && (
                                                    <div className="ml-auto w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>
        </div>
    );

};
