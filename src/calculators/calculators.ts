import { DiscountType, ServiceType } from "../types/serviceTypes";
import { CalculationResult, CalculatorBase } from "./calculatorBase";


export interface ICalculator {
    calculate(selectedServices: ServiceType[]) : CalculationResult
}

export class CalculatorFor2020 extends CalculatorBase implements ICalculator {
    constructor(){
        super(
            new Map<ServiceType, number>([
                ["Photography", 1700],
                ["VideoRecording", 1700],
                ["WeddingSession", 600],
                ["BlurayPackage", 300],
                ["TwoDayEvent", 400],
            ]),
            new Map<DiscountType, number>([
                ["PhotographyAndVideo", 1200],
                ["PhotographyAndSession", 300],
                ["VideoAndSession", 300]
            ]));
    }
};

export class CalculatorFor2021 extends CalculatorBase implements ICalculator {
    constructor(){
        super(
            new Map<ServiceType, number>([
                ["Photography", 1800],
                ["VideoRecording", 1800],
                ["WeddingSession", 600],
                ["BlurayPackage", 300],
                ["TwoDayEvent", 400],
            ]),
            new Map<DiscountType, number>([
                ["PhotographyAndVideo", 1300],
                ["PhotographyAndSession", 300],
                ["VideoAndSession", 300]
            ]));
    }
};

export class CalculatorFor2022 extends CalculatorBase implements ICalculator {
    constructor(){
        super(
        new Map<ServiceType, number>([
            ["Photography", 1900],
            ["VideoRecording", 1900],
            ["WeddingSession", 600],
            ["BlurayPackage", 300],
            ["TwoDayEvent", 400],
        ]),
        new Map<DiscountType, number>([
            ["PhotographyAndVideo", 1300],
            ["PhotographyAndSession", 600],
            ["VideoAndSession", 300]
        ]));
    }
};