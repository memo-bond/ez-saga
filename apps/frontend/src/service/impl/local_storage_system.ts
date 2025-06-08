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
        const data: System[] = raw ? JSON.parse(raw) : [];
        return [...data].sort((s1, s2) => Number(s1.systemId) - Number(s2.systemId));
    },

    async saveSystem(system: System): Promise<void> {
        const newSystem = { ...system };

        // Assign auto ID if new
        if (!newSystem.systemId) {
            const nextId = await this.getNextSystemId();
            newSystem.systemId = nextId.toString();
        }

        // Fetch existing systems
        const systems: System[] = await this.getSystems();

        // 🔐 Check name uniqueness (exclude current service if editing)
        const isDuplicate = systems.some(s =>
            s.displayName === newSystem.displayName && s.systemId !== newSystem.systemId
        );

        if (isDuplicate)
            throw new Error(`Service name "${newSystem.namespace}" already exists.`);

        // Proceed with save
        const updated = systems
            .filter(s => s.systemId !== newSystem.systemId)
            .concat(newSystem);

        localStorage.setItem(LOCAL_SYSTEMS_KEY, JSON.stringify(updated));
    }
};