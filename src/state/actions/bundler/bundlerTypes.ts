export interface Bundle {
    code: string,
    err: string
    isLoading: boolean
}

export interface BundlesState {
    [key: string]: Bundle

}