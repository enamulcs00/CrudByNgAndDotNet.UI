import { GenericActions } from "src/app/core/ngrx-store/action";

export interface ApiResponse<T> {
  message: string;      // A message describing the result of the API call
  status: boolean;       // A string indicating the status (e.g., "success", "failure")
  statusCode: number;   // The HTTP status code of the response
  data: T;              // The actual data returned by the API
  errorDetails?: object;   // Additional error details (optional)
}

export interface IGetApi<T extends BaseModel> {
endPoint:string;
force:boolean;
actionName:GenericActions<T>;
featureName:string;
query?: string;
sortBy?: string;
sortDirection?: string;
pageNumber?: number;
pageSize?: number;
}

export interface IPayloadApi<T extends BaseModel> {
  endPoint:string;
  force:boolean;
  actionName:GenericActions<T>;
  featureName:string;
  payload:T;
  path:string;
  }

export interface IPost {
  body:string;
  id:string
  title:string
  userId:number
}

export interface BaseModel {
  id: string ;
}

export interface Category extends BaseModel {
  id: string;
  name: string;
  urlHandle: string;
}

export interface Product extends BaseModel {
  name: string;
  price: number;
  categoryId: string;
}

export interface Student extends BaseModel {
  firstName: string;
  lastName: string;
  grade: number;
}



export interface User extends BaseModel {
  firstName?: string
  lastName?: string
  email?: string
  phoneNumber?:string
  address?: string
  isRegularUser?:boolean
  role?: string
}