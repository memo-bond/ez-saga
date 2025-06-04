"use client";

import {useEffect} from "react";
import {AppLayout} from "@/app/layout/app_layout";
import {useSidebarStore} from "@/stores/global_store";
import {PrimaryButton} from "@/ui/components";

export const dynamic = "force-static";

export default function NetworkNginxPage() {
    const setActiveTab = useSidebarStore((s) => s.setActiveTab);
    const setSubActiveTab = useSidebarStore((s) => s.setActiveSubTab);

    useEffect(() => {
        setActiveTab('network');
        setSubActiveTab('nginx');
    }, [setActiveTab]);


    return (
        <AppLayout>
            <div>
                <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <PrimaryButton>
                            + Nginx
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
