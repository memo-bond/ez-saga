import {SystemAPI} from "@/service/service_api";
import {System} from "@/types/system";

const LOCAL_SYSTEMS_KEY = 'ez-saga.systems';

export const LocalStorageSystemAPI: SystemAPI = {

    async getSystems() {
        const raw = localStorage.getItem(LOCAL_SYSTEMS_KEY);
        return raw ? JSON.parse(raw) : [];
    },

    async saveSystem(system: System) {
        const systems = await this.getSystems();
        const updated = systems.filter(s => s.systemId !== system.systemId).concat(system);
        localStorage.setItem(LOCAL_SYSTEMS_KEY, JSON.stringify(updated));
    },
};