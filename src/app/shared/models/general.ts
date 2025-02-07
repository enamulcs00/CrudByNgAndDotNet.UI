export interface ApiResponse<T> {
  message: string;      // A message describing the result of the API call
  status: boolean;       // A string indicating the status (e.g., "success", "failure")
  statusCode: number;   // The HTTP status code of the response
  data: T;              // The actual data returned by the API
  errorDetails?: object;   // Additional error details (optional)
}

export interface IServiceParams {
actionName?:string;
selectorName?:string;
query?: string;
sortBy?: string;
sortDirection?: string;
pageNumber?: number;
pageSize?: number;
}

export interface GenericState<T> {
  entities: T[];
  loaded: boolean;
  loading: boolean;
  error: string | null;
}
export interface IPost {
  body:string;
  id:string
  title:string
  userId:number
}

export interface BaseModel {
  id: string | number;
}

export interface Category extends BaseModel {
  name: string;
  description: string;
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
  username: string;
  email: string;
  role: string;
}

