export interface ApiResponse {
  err: string | null;
  images: Image;
  status?: number;
  document?: any;
}

type Image = {
  [key: string]: string;
};
