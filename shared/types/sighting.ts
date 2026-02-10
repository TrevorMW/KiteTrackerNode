import { TagResponse } from "./tag"
import { SightingTag } from "./sightingtag"

export interface Sighting {
    id: bigint;
    latitude: number;        // Prisma Decimal -> string
    longitude: number;       // Prisma Decimal -> string
    description: string;
    image_url: string;
    created_at: Date;
    updated_at: Date;
    tags?: SightingTag[];
}

export interface CreateSightingInput {
    latitude: number;
    longitude: number;
    description: string;
    photo?: File;
    tags?: {
        tagName: string;
        tagValue: string;
    }[];
}

export interface SightingResponse {
    id: string;              // bigint -> string
    latitude: number;
    longitude: number;
    description: string;
    imageUrl: string;
    createdAt: string;       // ISO string
    updatedAt: string;       // ISO string
    tags?: TagResponse[];
}