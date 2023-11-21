export interface Bundle {
    code: string,
    err: string
}

export interface BundlesState {
    [key: string]: {
        isLoading: boolean,
        code: string,
        err: string
    } | undefined;
}