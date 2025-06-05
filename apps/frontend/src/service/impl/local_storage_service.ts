import {ServiceAPI} from "@/service/service_api";
import {Service} from "@/types/service";

const LOCAL_SYSTEMS_KEY = 'ez-saga.services';
const SERVICE_ID_COUNTER_KEY = 'ez-saga.service_id_counter';

export const LocalStorageServiceAPI: ServiceAPI = {

    async getNextServiceId(): Promise<number> {
        const raw = localStorage.getItem(SERVICE_ID_COUNTER_KEY);
        const nextId = raw ? parseInt(raw, 10) + 1 : 1;
        localStorage.setItem(SERVICE_ID_COUNTER_KEY, String(nextId));
        return nextId;
    },

    async getServices() {
        const raw = localStorage.getItem(LOCAL_SYSTEMS_KEY);
        const data: Service[] = raw ? JSON.parse(raw) : [];
        return [...data].sort((s1, s2) => Number(s1.id) - Number(s2.id));

    },

    async saveService(service: Service): Promise<void> {
        const newService = { ...service };

        // Assign auto ID if new
        if (!newService.id) {
            const nextId = await this.getNextServiceId();
            newService.id = nextId.toString();
        }

        // Fetch existing services
        const services: Service[] = await this.getServices();

        // 🔐 Check name uniqueness (exclude current service if editing)
        const isDuplicate = services.some(s =>
            s.name === newService.name && s.id !== newService.id
        );

        if (isDuplicate) {
            throw new Error(`Service name "${newService.name}" already exists.`);
        }

        // Proceed with save
        const updated = services
            .filter(s => s.id !== newService.id)
            .concat(newService);

        localStorage.setItem(LOCAL_SYSTEMS_KEY, JSON.stringify(updated));
    }

};