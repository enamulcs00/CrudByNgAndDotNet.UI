import { BaseModel } from "src/app/core/models/general";

export interface AddCategoryRequest extends BaseModel{
  name: string;
  urlHandle: string;
}
