"use client";

import {useEffect, useState} from "react";
import {AppLayout} from "@/app/layout/app_layout";
import {useSidebarStore} from "@/stores/global_store";
import {Service} from "@/types/service";
import {PrimaryButton} from "@/ui/components";

export const dynamic = "force-static";

export default function InfrastructureKafkaPage() {
    const setActiveTab = useSidebarStore((s) => s.setActiveTab);
    const setSubActiveTab = useSidebarStore((s) => s.setActiveSubTab);

    useEffect(() => {
        setActiveTab('infrastructure');
        setSubActiveTab('kafka');
    }, [setActiveTab]);

    return (
        <AppLayout>
            <div>
                <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <PrimaryButton>
                            + Kafka
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
