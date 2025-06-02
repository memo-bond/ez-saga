"use client";

import {useState} from "react";
import CreateSystemModal from "./create_system_modal";
import SystemTable from "./system_table";
import {SystemFormData} from "@/types/system";
import {useSidebarStore} from "@/stores/global_store";
import {AppLayout} from "@/app/layout/app_layout";
import {PrimaryButton} from "@/ui/components";

export const dynamic = "force-static";

export default function SystemManagerPage() {
    const [systems, setSystems] = useState<SystemFormData[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<SystemFormData | null>(null);

    const activeTab = useSidebarStore((s) => s.activeTab);

    // Open modal for new systems
    const handleNew = () => {
        setSelectedSystem(null);
        setOpenModal(true);
    };

    // Open modal for edit
    const handleEdit = (system: SystemFormData) => {
        setSelectedSystem(system);
        setOpenModal(true);
    };

    // Toggle status
    const handleToggleStatus = (systemId: string, currentlyActive: boolean) => {
        setSystems((prev) =>
            prev.map((sys) =>
                sys.systemId === systemId
                    ? {...sys, status: currentlyActive ? "inactive" : "active"}
                    : sys
            )
        );
    };

    // Save or update systems
    const handleSave = (form: SystemFormData) => {
        setSystems((prev) => {
            const exists = prev.find((s) => s.systemId === form.systemId);
            if (exists) {
                return prev.map((s) => (s.systemId === form.systemId ? form : s));
            } else {
                return [...prev, {...form, status: "active"}];
            }
        });
        setOpenModal(false);
    };

    return (
        <AppLayout>
            {activeTab === "systems" || activeTab === "dashboard" ? (
                <>
                    <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                        <div className="flex gap-4">
                            <PrimaryButton onClick={handleNew}>
                                + New System
                            </PrimaryButton>
                        </div>
                    </div>

                    <SystemTable
                        systems={systems}
                        onEdit={handleEdit}
                        onToggleStatus={handleToggleStatus}
                    />

                    {openModal && (
                        <CreateSystemModal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            initialData={selectedSystem}
                            onSave={handleSave}
                        />
                    )}
                </>
            ) : (
                <div className="text-white">Coming soon: {activeTab}</div>
            )}
        </AppLayout>
    );
}
