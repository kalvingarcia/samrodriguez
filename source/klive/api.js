// Read-only client for the klive delivery API. The delivery key can only read published
// content, so it's safe for it to ship in the browser bundle.
const BASE_URL = process.env.NEXT_PUBLIC_KLIVE_URL;
const API_KEY = process.env.NEXT_PUBLIC_KLIVE_KEY;
const COLLECTION = "portfolio";
const PAGE_SIZE = 100;
// Media URLs are presigned for 1 hour; refetch a little before they expire.
const ASSET_TTL = 50 * 60 * 1000;

const VIDEO_TYPES = {mp4: "video/mp4", mov: "video/quicktime", webm: "video/webm", m4v: "video/mp4"};
const IMAGE_TYPES = {jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp", avif: "image/avif", svg: "image/svg+xml"};

export async function kliveFetch(path) {
    const response = await fetch(`${BASE_URL}${path}`, {headers: {"X-API-Key": API_KEY}});
    if(!response.ok) throw new Error(`klive ${path} responded ${response.status}`);
    return response.json();
}

/** Every published portfolio entry, fully loaded (body + cover), in the collection's order. */
export async function getProjects() {
    const summaries = [];
    for(let page = 1; ; page++) {
        const batch = await kliveFetch(`/collections/${COLLECTION}/entries?page=${page}&limit=${PAGE_SIZE}`);
        summaries.push(...batch);
        if(batch.length < PAGE_SIZE) break;
    }
    // The list endpoint only returns summaries, so fetch each full entry.
    return Promise.all(summaries.map(({slug}) => kliveFetch(`/collections/${COLLECTION}/entries/by-slug/${encodeURIComponent(slug)}`)));
}

/** The collection's render config; blocks merge it over their own defaults. */
export function getRenderConfig() {
    return kliveFetch(`/collections/${COLLECTION}/render-config`);
}

// The delivery API only returns a signed URL, so the mime type comes from its extension.
function mimeTypeFromURL(url) {
    const extension = new URL(url).pathname.split(".").pop().toLowerCase();
    return VIDEO_TYPES[extension]?? IMAGE_TYPES[extension]?? "application/octet-stream";
}

const assetCache = new Map();

/**
 * Resolves an asset id to the same shape the klive block renderers expect
 * (`{id, url, mime_type, width, height, alt_text}`). Requests are cached per id + size
 * until shortly before the signed URL expires.
 */
export function getAsset(id, size = "full") {
    const key = `${id}/${size}`;
    const cached = assetCache.get(key);
    if(cached && cached.expires > Date.now()) return cached.promise;

    const promise = kliveFetch(`/media/${encodeURIComponent(id)}/${size}`).then(({url}) => ({
        id,
        url,
        mime_type: mimeTypeFromURL(url),
        width: null,
        height: null,
        alt_text: null
    }));
    // Don't cache failures, so a later render can retry.
    promise.catch(() => assetCache.delete(key));
    assetCache.set(key, {promise, expires: Date.now() + ASSET_TTL});
    return promise;
}
