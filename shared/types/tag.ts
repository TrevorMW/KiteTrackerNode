export interface Tag {
    id: bigint;
    tagName: string;
    tagValue: string;
    createdAt: Date;
}

export interface TagResponse {
    id: string;              // bigint -> string
    tagName: string;
    tagValue: string;
    createdAt: string;       // ISO string
}