import {System} from "@/types/system";

export interface SystemAPI {

    getNextSystemId(): Promise<number>;

    getSystems(): Promise<System[]>;

    saveSystem(system: System): Promise<void>;
}