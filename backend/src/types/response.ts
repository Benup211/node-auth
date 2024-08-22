export type SuccessResponse = {
    status: 200;
    message: string;
    [key: string]: any;
}

export type ErrorResponse = {
    status: number;
    errorName: string;
    errorMessage: string;
    [key: string]: any;
}