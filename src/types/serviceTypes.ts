export type ServiceYear = 2020 | 2021 | 2022;
export type ServiceType = "Photography" | "VideoRecording" | "BlurayPackage" | "TwoDayEvent" | "WeddingSession";
export type DiscountType = "PhotographyAndVideo" | "PhotographyAndSession" | "VideoAndSession"

export const isPrimaryService = (service: ServiceType) =>
    service === "Photography" || service === "VideoRecording";