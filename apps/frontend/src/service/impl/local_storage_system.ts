import {SystemAPI} from "@/service/system_api";
import {System} from "@/types/system";

const LOCAL_SYSTEMS_KEY = 'ez-saga.systems';
const SYSTEM_ID_COUNTER_KEY = 'ez-saga.system_id_counter';

export const LocalStorageSystemAPI: SystemAPI = {

    async getNextSystemId(): Promise<number> {
        const raw = localStorage.getItem(SYSTEM_ID_COUNTER_KEY);
        const nextId = raw ? parseInt(raw, 10) + 1 : 1;
        localStorage.setItem(SYSTEM_ID_COUNTER_KEY, String(nextId));
        return nextId;
    },

    async getSystems() {
        const raw = localStorage.getItem(LOCAL_SYSTEMS_KEY);
        return raw ? JSON.parse(raw) : [];
    },

    async saveSystem(system: System): Promise<void> {
        const newSystem = { ...system };
        if (!newSystem.systemId) {
            newSystem.systemId = this.getNextSystemId().toString();
        }
        const systems = await this.getSystems();
        const updated = systems.filter(s => s.systemId !== newSystem.systemId).concat(newSystem);
        localStorage.setItem(LOCAL_SYSTEMS_KEY, JSON.stringify(updated));
    },
};