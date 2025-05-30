"use client";

import { AppLayout } from "@/app/layout/app_layout";
import { useSidebarStore } from "@/stores/global_store";

export default function NetworkPage() {
    const activeTab = useSidebarStore((s) => s.activeTab);

    return (
        <AppLayout>
            <div className="text-white text-lg px-6 py-12 text-center">
                🚧 Coming soon: <span className="font-semibold">{activeTab}</span>
            </div>
        </AppLayout>
    );
}
