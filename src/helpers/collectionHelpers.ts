import { ServiceType } from "../types/serviceTypes";

export const addWithDuplicateCheck = (services: ServiceType[], serviceToAdd: ServiceType) => {
    if (!services.some(x => x === serviceToAdd)) {
        services.push(serviceToAdd);
    }
}

export const removeElements = (services: ServiceType[], servicesToRemove: ServiceType[]): ServiceType[] =>
    services.filter(x => !servicesToRemove.includes(x));

export const removeElement = (services: ServiceType[], serviceToRemove: ServiceType): ServiceType[] =>
    removeElements(services, [serviceToRemove]);