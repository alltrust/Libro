import { CellTypes } from "./cellTypes";

export type CellDirection = "up" | "down";

export interface MoveCellPayload {
    id: string;
    direction: CellDirection;
}

export interface DeleteCellPayload {
    id: string
}

export interface InsertCellBeforePayload {
    id: string;
    type: CellTypes;
}

export interface UpdateCellPayload {
    id: string,
    content: string
}

