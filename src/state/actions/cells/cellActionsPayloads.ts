import { CellTypes } from "./cellTypes";

type CellDirection = "up" | "down";

export interface MoveCellPayload {
    id: string;
    direction: CellDirection;
}

export interface DeleteCellPayload {
    id: string
}

export interface InsertCellBeforePayload {
    id: string | null;
    type: CellTypes;
}

export interface UpdateCellPayload {
    id: string,
    content: string
}

