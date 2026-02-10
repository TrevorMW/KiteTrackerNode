import { Tag } from "./tag"
import { Sighting } from "./sighting"

export interface SightingTag {
    sightingId: bigint;
    tagId: bigint;
    createdAt: Date;
    tag?: Tag;
    sighting?: Sighting;
}