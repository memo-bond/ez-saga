import {System} from "@/types/system";

export interface SystemAPI {
    getSystems(): Promise<System[]>;

    saveSystem(system: System): Promise<void>;
}