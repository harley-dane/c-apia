// src/types.ts
export interface Affiliate {
  _id: string;
  name: string;
  location?: string;
  cause?: string;
  description?: string; // Made optional
  images?: string[]; // Made optional
}
