"use client";

import {useState, useEffect} from "react";
import {AppLayout} from "@/app/layout/app_layout";
import {useSidebarStore} from "@/stores/global_store";
import {Input} from "@/components/ui/input";
import {Select, SelectTrigger, SelectValue, SelectContent, SelectItem} from "@/components/ui/select";
import {Service, ServiceStatus, ServiceType} from "@/types/service";
import ServiceTable from "./service_table";
import CreateServicePanel from "./create_service_panel";

export default function ServiceManagerPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [statusFilter, setStatusFilter] = useState<ServiceStatus | "ALL">("ALL");
    const [typeFilter, setTypeFilter] = useState<ServiceType | "ALL">("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    const activeTab = useSidebarStore((s) => s.activeTab);

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data));
    }, []);

    const filtered = services.filter((svc) => {
        const matchStatus = statusFilter === "ALL" || svc.status === statusFilter;
        const matchType = typeFilter === "ALL" || svc.type === typeFilter;
        const matchSearch = svc.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchStatus && matchType && matchSearch;
    });

    return (
        <AppLayout>
            {activeTab === "services" || activeTab === "dashboard" ? (
                <>
                    <div className="flex flex-wrap gap-4 mb-4 justify-between items-center">
                        <Input
                            placeholder="Search service name..."
                            className="w-60"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        <div className="flex gap-4">
                            <Select onValueChange={(value) => setStatusFilter(value as ServiceStatus | "ALL")}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Filter by status"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Status</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                    <SelectItem value="ERROR">Error</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select onValueChange={(value) => setTypeFilter(value as ServiceType | "ALL")}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Filter by type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ALL">All Types</SelectItem>
                                    <SelectItem value="REST">REST</SelectItem>
                                    <SelectItem value="KAFKA">Kafka</SelectItem>
                                </SelectContent>
                            </Select>

                            <button
                                className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 shadow-md"
                                onClick={() => setSelectedService({} as Service)}
                            >
                                + New Service
                            </button>
                        </div>
                    </div>

                    <ServiceTable services={filtered} onView={(service) => setSelectedService(service)}/>

                    {selectedService && (
                        <div
                            className="fixed inset-y-0 right-0 w-full max-w-xl bg-white border-l shadow-lg z-50 overflow-y-auto">
                            <CreateServicePanel
                                initialData={selectedService}
                                onClose={() => setSelectedService(null)}
                                onSave={() => setSelectedService(null)}
                            />
                        </div>
                    )}
                </>
            ) : (
                <div className="text-white">Coming soon: {activeTab}</div>
            )}
        </AppLayout>
    );
}
