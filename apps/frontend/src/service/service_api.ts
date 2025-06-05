import {Service} from "@/types/service";

export interface ServiceAPI {

    getNextServiceId(): Promise<number>;

    getServices(): Promise<Service[]>;

    saveService(service: Service): Promise<void>;
}