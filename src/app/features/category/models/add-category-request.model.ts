import { BaseModel } from "src/app/shared/models/general";

export interface AddCategoryRequest extends BaseModel{
  name: string;
  urlHandle: string;
}
