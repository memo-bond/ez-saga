import {Service} from "@/types/service";

export interface ServiceAPI {
    getServices(): Promise<Service[]>;

    saveService(service: Service): Promise<void>;
}