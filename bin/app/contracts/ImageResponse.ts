export interface ImageResponse {
  err: string;
  images: Record<string, unknown>[];
  status: number;
  document: any;
}
