export type CellTypes = "code" | "text";

export interface Cell {
    id: string;
    type: CellTypes;
    content: string;
}

export interface CellsState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    };
}