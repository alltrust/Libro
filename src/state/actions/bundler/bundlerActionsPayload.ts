import { Bundle } from "./bundlerTypes"

export interface BundleStartPayload{
    cellId: string,
}

export interface BundleCompletePayload{
   cellId: string, 
   bundle: Bundle
}
