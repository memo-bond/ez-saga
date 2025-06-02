"use client";

import {useState} from "react";
import {AppLayout} from "@/app/layout/app_layout";
import {useSidebarStore} from "@/stores/global_store";
import {Service} from "@/types/service";
import ServiceTable from "./service_table";
import CreateServicePanel from "./create_service_panel";
import {PrimaryButton} from "@/ui/components";

export const dynamic = "force-static";

export default function ServiceManagerPage() {
    const [services, setService] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [openPanel, setOpenPanel] = useState(false);

    const handleNew = () => {
        setSelectedService(null);
        setOpenPanel(true);
    }

    // Save or update systems
    const handleSave = (form: Service) => {
        setService((prev) => {
            const exists = prev.find((s) => s.id === form.id);
            if (exists) {
                return prev.map((s) => (s.id === form.id ? form : s));
            } else {
                return [...prev, {...form, status: 'ACTIVE'}];
            }
        });
        setOpenPanel(false);
    };

    const activeTab = useSidebarStore((s) => s.activeTab);

    return (
        <AppLayout>
            {activeTab === "services" || activeTab === "dashboard" ? (
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
            ) : (
                <div className="text-white">Coming soon: {activeTab}</div>
            )}
        </AppLayout>
    );
}
