"use client";

import {useEffect, useState} from "react";
import CreateSystemModal from "./create_system_modal";
import SystemTable from "./system_table";
import {System} from "@/types/system";
import {useSidebarStore} from "@/stores/global_store";
import {AppLayout} from "@/app/layout/app_layout";
import {PrimaryButton} from "@/ui/components";
import {LocalStorageSystemAPI} from "@/service/impl/local_storage_system";
import ErrorPopup from "@/ui/error_popup";

export const dynamic = "force-static";

export default function SystemPage() {
    const [systems, setSystems] = useState<System[]>([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSystem, setSelectedSystem] = useState<System | null>(null);
    const setActiveTab = useSidebarStore((s) => s.setActiveTab);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setActiveTab('systems');
        void fetchSystems();
    }, [setActiveTab]);

    const fetchSystems = async () => {
        const data = await LocalStorageSystemAPI.getSystems();
        setSystems(data);
    }

    // Open modal for new systems
    const handleNew = () => {
        setSelectedSystem(null);
        setOpenModal(true);
    };

    // Open modal for edit
    const handleEdit = (system: System) => {
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
    const handleSave = async (form: System) => {
        try {
            await LocalStorageSystemAPI.saveSystem({
                ...form,
                status: form.status || 'ACTIVE',
            });
            await fetchSystems();
            setOpenModal(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to save system.");
            }
        }
    };

    return (
        <AppLayout>
            <div>
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
            </div>
            {errorMessage && (
                <ErrorPopup
                    message={errorMessage}
                    onClose={() => setErrorMessage(null)}
                />
            )}
        </AppLayout>
    );
}
