/**
 * Walks a Tiptap JSON document and collects every media asset id referenced anywhere
 * in it — `asset_id` (Media/Hero/Banner blocks) and `asset_ids` (Gallery/Carousel
 * blocks), recursing into container blocks' own `content`.
 *
 * Copied from klive-dashboard/dashboard/lib/utils/extract-asset-ids.ts.
 */
export function extractReferencedAssetIds(doc) {
    const ids = new Set();
    const walk = node => {
        if(!node || typeof node !== "object") return;
        const {attrs, content} = node;
        if(attrs) {
            if(typeof attrs.asset_id === "string") ids.add(attrs.asset_id);
            if(Array.isArray(attrs.asset_ids))
                for(const id of attrs.asset_ids) if(typeof id === "string") ids.add(id);
        }
        if(Array.isArray(content)) content.forEach(walk);
    };
    walk(doc);
    return Array.from(ids);
}
