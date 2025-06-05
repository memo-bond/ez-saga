"use client";

import {useEffect, useState} from "react";
import {AppLayout} from "@/app/layout/app_layout";
import {useSidebarStore} from "@/stores/global_store";
import {Service} from "@/types/service";
import ServiceTable from "./service_table";
import CreateServicePanel from "./create_service_panel";
import {PrimaryButton} from "@/ui/components";
import {LocalStorageServiceAPI} from "@/service/impl/local_storage_service";
import ErrorPopup from "@/ui/error_popup";

export const dynamic = "force-static";

export default function ServicePage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [openPanel, setOpenPanel] = useState(false);
    const setActiveTab = useSidebarStore((s) => s.setActiveTab);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);


    useEffect(() => {
        setActiveTab('services');
        void fetchServices();
    }, [setActiveTab]);

    const fetchServices = async () => {
        const data = await LocalStorageServiceAPI.getServices();
        setServices(data);
    };

    const handleNew = () => {
        setSelectedService(null);
        setOpenPanel(true);
    }

    const handleSave = async (form: Service) => {
        try {
            await LocalStorageServiceAPI.saveService({
                ...form,
                status: form.status || 'ACTIVE',
            });
            await fetchServices();
            setOpenPanel(false);
        } catch (error: any) {
            setErrorMessage(error.message || "Failed to save service.");
        }
    };


    return (
        <AppLayout>
            <div>
                <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                    <div className="flex gap-4">
                        <PrimaryButton onClick={handleNew}>
                            + New Service
                        </PrimaryButton>
                    </div>
                </div>

                <ServiceTable services={services} onView={(service) => {
                    setSelectedService(service);
                    setOpenPanel(true);
                }}/>

                {openPanel && (
                    <div
                        className="fixed inset-y-0 right-0 w-full max-w-xl bg-white border-l shadow-2xl z-50 overflow-y-auto">
                        <CreateServicePanel
                            initialData={selectedService}
                            onClose={() => {
                                setSelectedService(null);
                                setOpenPanel(false);
                            }}
                            onSave={handleSave}
                        />
                    </div>
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
