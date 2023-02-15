import { DiscountType, ServiceType } from "../types/serviceTypes";

export type CalculationResult = {
    basePrice : number;
    finalPrice : number;
}

export class CalculatorBase {
    private priceMap : Map<ServiceType, number>;
    private discountMap : Map<DiscountType, number>;

    constructor(priceMap : Map<ServiceType, number>, discountMap : Map<DiscountType, number>) {
        this.priceMap = priceMap;
        this.discountMap = discountMap;
      }

    private sumBase = (selectedServices: ServiceType[]) => selectedServices
        .map(x => this.priceMap.get(x))
        .reduce((sum, x) => sum + x, 0);

    private getMaxDiscount = (selectedServices: ServiceType[]) => {
        let packageDiscount = 0;
        let addOnsDiscount = 0;
        const protographyIndex = selectedServices.indexOf("Photography");
        const videoRecordingIndex = selectedServices.indexOf("VideoRecording");
        const weddingSessionIndex = selectedServices.indexOf("WeddingSession");
        if(protographyIndex >= 0 && videoRecordingIndex >= 0) {
            packageDiscount = this.discountMap.get("PhotographyAndVideo");
        }

        if(protographyIndex >= 0 && weddingSessionIndex >= 0) {
            addOnsDiscount = addOnsDiscount > this.discountMap.get("PhotographyAndSession") ? 
                addOnsDiscount : 
                this.discountMap.get("PhotographyAndSession");
        }

        if(videoRecordingIndex >= 0 && weddingSessionIndex >= 0) {
            addOnsDiscount = addOnsDiscount > this.discountMap.get("VideoAndSession") ? 
                addOnsDiscount :
                this.discountMap.get("VideoAndSession");
        }

        return packageDiscount + addOnsDiscount;
    }

    private sumFinal = (selectedServices: ServiceType[]) => {
        return this.sumBase(selectedServices) - this.getMaxDiscount(selectedServices);
    }

    calculate = (selectedServices: ServiceType[]) : CalculationResult => {
        return {
            basePrice : this.sumBase(selectedServices),
            finalPrice : this.sumFinal(selectedServices),
        };
    }
}