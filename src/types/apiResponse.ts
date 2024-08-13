/* eslint-disable @typescript-eslint/no-explicit-any */
export type ApiResponse<T> = {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: any;
};
