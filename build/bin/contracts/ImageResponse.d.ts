export interface ImageResponse {
    err: string | null;
    images: Record<string, unknown>;
    status?: number;
    document?: any;
}
