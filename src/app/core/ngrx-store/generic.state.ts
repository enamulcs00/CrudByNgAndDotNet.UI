import { BaseModel } from "src/app/shared/models/general";

export interface GenericState<T extends BaseModel> {
  entities: { [key: string]: T };
  ids: string[];
  loading: boolean;
  error: string | null;
  selectedId: string | null;
}

export const initialGenericState = {
  entities: {},
  ids: [],
  loading: false,
  error: null,
  selectedId: null,
};