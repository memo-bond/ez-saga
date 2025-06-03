import {ServiceAPI} from "@/service/system_api";
import {Service} from "@/types/service";

const LOCAL_SYSTEMS_KEY = 'ez-saga.services';

export const LocalStorageServiceAPI: ServiceAPI = {

    async getServices() {
        const raw = localStorage.getItem(LOCAL_SYSTEMS_KEY);
        return raw ? JSON.parse(raw) : [];
    },

    async saveService(service: Service) {
        const systems = await this.getServices();
        const updated = systems.filter(s => s.id !== service.id).concat(service);
        localStorage.setItem(LOCAL_SYSTEMS_KEY, JSON.stringify(updated));
    },
};