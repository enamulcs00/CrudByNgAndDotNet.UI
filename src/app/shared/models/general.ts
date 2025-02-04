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
