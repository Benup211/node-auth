export interface SuccessResponse{
    status: 200;
    message: string;
    [key: string]: any;
}

export interface ErrorResponse {
    status: number;
    errorName: string;
    errorMessage: string;
    [key: string]: any;
}