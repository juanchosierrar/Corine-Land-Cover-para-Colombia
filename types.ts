export interface LandCoverItem {
  code: string;
  name: string;
  rgb: string; // Format "R-G-B" from OCR
  level: number;
  children?: LandCoverItem[];
  description?: string; // Loaded via AI
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export enum ImageResolution {
  RES_1K = "1K",
  RES_2K = "2K",
  RES_4K = "4K"
}
