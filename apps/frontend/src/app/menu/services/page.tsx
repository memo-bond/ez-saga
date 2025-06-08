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
import {LocalStorageSystemAPI} from "@/service/impl/local_storage_system";
import {System} from "@/types/system";

export const dynamic = "force-static";

export default function ServicePage() {
    const defaultSystem: System = {
        systemId: "1",
        displayName: "Timo",
        description: "Digital Bank by Bản Việt",
        ingressEnabled: false,
        ingressHostname: "",
        kafkaBootstrapServers: "",
        kafkaEnabled: false,
        kafkaExternal: false,
        mysqlEnabled: false,
        mysqlExternal: false,
        mysqlJdbcUrl: "",
        mysqlPassword: "",
        mysqlUsername: "",
        namespace: "",
        redisEnabled: false,
        redisExternal: false,
        redisHost: "",
        services: [],
        status: 'ACTIVE',
        tracingEnabled: false
    };
    const [systems, setSystems] = useState<System[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [selectedSystemId, setSelectedSystemId] = useState<string | null>(null);
    const [selectedSystem, setSelectedSystem] = useState<System>(defaultSystem);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [openPanel, setOpenPanel] = useState(false);
    const setActiveTab = useSidebarStore((s) => s.setActiveTab);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        setActiveTab('services');
        const init = async () => {
            const systems = await fetchSystems();

            if (systems.length > 0) {
                const first = systems[0];
                console.log("Init system: ", first);

                setSelectedSystem(first);
                setSelectedSystemId(first.systemId);
                await fetchServices(first.systemId);
            }
        };
        void init();
    }, [setActiveTab]);

    const fetchSystems = async () => {
        const data = await LocalStorageSystemAPI.getSystems();
        setSystems(data);
        return data;
    }

    const fetchServices = async (systemId: string) => {
        console.log('selectedSystemId : ', systemId);
        const data = await LocalStorageServiceAPI.getServices(systemId);
        setServices(data);
    };

    const getSystemById = async (systemId: string) => {
        const data = await LocalStorageSystemAPI.getSystems();
        return data.find(s => s.systemId === systemId) ?? defaultSystem;
    }


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
            await fetchServices(selectedSystemId ?? defaultSystem.systemId);
            setOpenPanel(false);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Failed to save service.");
            }
        }
    };

    const handleSystemChange = async (value: string | null) => {
        if (value) {
            console.log('Selected system id ', value);
            setSelectedSystemId(value);
            const system = await getSystemById(value);
            setSelectedSystem(system);
            void fetchServices(value);
        }
    }

    return (
        <AppLayout>
            <div>
                <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                    <div className="flex items-center gap-3">
                        <label className="text-white font-medium">System:</label>
                        <select
                            className="bg-slate-800 text-white px-3 py-2 rounded-xl border border-white/10 shadow-inner focus:outline-none"
                            value={selectedSystemId ?? ''}
                            onChange={(e) => handleSystemChange(e.target.value || null)}
                        >
                            {systems.map((sys) => (
                                <option key={sys.systemId} value={sys.systemId}>
                                    {sys.displayName}
                                </option>
                            ))}
                        </select>
                    </div>

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
                            selectedSystem={selectedSystem}
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
