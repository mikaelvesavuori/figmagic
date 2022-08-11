export interface ApiResponse {
    err: string | null;
    images: Image;
    status?: number;
    document?: any;
}
declare type Image = {
    [key: string]: string;
};
export {};
