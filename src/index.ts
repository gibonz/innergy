import { CalculatorFor2020, CalculatorFor2021, CalculatorFor2022, ICalculator } from "./calculators/calculators";
import { addWithDuplicateCheck, removeElement, removeElements } from "./helpers/collectionHelpers";
import { isPrimaryService, ServiceType, ServiceYear } from "./types/serviceTypes";

const relatedServiceToMainServiceRelations = new Map<ServiceType, ServiceType[]>([
    ["BlurayPackage", ["VideoRecording"]],
    ["TwoDayEvent", ["Photography", "VideoRecording"]],
]);

const mainServiceToRelatedServiceRelations = new Map<ServiceType, ServiceType[]>([
    ["VideoRecording", ["BlurayPackage", "TwoDayEvent"]],
    ["Photography", ["TwoDayEvent"]],
]);

export const updateSelectedServices = (
    previouslySelectedServices: ServiceType[],
    action: { type: "Select" | "Deselect"; service: ServiceType }
) => {
    let updatedServices = [...previouslySelectedServices];
    switch(action.type) {
        case "Select":
            if(isPrimaryService(action.service)) {
                addWithDuplicateCheck(updatedServices, action.service);
            } else {
                const requiredMainServices = relatedServiceToMainServiceRelations.get(action.service);
                if(requiredMainServices.some((x) => updatedServices.includes(x))) {
                    addWithDuplicateCheck(updatedServices, action.service);
                }
            }
            
            break;
        case "Deselect":
            if(updatedServices.some(x => x === action.service)) {
                if(isPrimaryService(action.service)) {
                    let servicesToRemove = mainServiceToRelatedServiceRelations.get(action.service);
                    servicesToRemove.push(action.service)
                    if(updatedServices.filter(x => isPrimaryService(x)).length === 2) {
                        servicesToRemove = removeElement(servicesToRemove, "TwoDayEvent");
                    }

                    updatedServices = removeElements(updatedServices, servicesToRemove);
                } else {
                    updatedServices = removeElement(updatedServices, action.service);
                }
            }
            
            break;
    }

    return updatedServices;
};



const calculators = new Map<ServiceYear, ICalculator>([
    [2020, new CalculatorFor2020()],
    [2021, new CalculatorFor2021()],
    [2022, new CalculatorFor2022()],
]);

export const calculatePrice = (selectedServices: ServiceType[], selectedYear: ServiceYear) => {
    return calculators.get(selectedYear).calculate(selectedServices);
}

