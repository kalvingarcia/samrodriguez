// Read-only client for the klive delivery API. Published content and media are public,
// so no key is needed.
const BASE_URL = process.env.NEXT_PUBLIC_KLIVE_URL;
const COLLECTION = "portfolio";
const PAGE_SIZE = 100;

export async function kliveFetch(path) {
    const response = await fetch(`${BASE_URL}${path}`);
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

/** The URL that serves an asset's bytes directly, usable as an <img>/<video> src. */
export function mediaURL(id, size = "full") {
    return `${BASE_URL}/media/${encodeURIComponent(id)}/${size}`;
}

const assetCache = new Map();

/**
 * Resolves an asset id to the same shape the klive block renderers expect
 * (`{id, url, mime_type, width, height, alt_text}`). Media URLs have no extension, so a
 * HEAD request supplies the mime type. They're immutable, so results are cached for good.
 */
export function getAsset(id, size = "full") {
    const key = `${id}/${size}`;
    if(assetCache.has(key)) return assetCache.get(key);

    const url = mediaURL(id, size);
    const promise = fetch(url, {method: "HEAD"}).then(response => {
        if(!response.ok) throw new Error(`klive ${url} responded ${response.status}`);
        return {
            id,
            url,
            mime_type: response.headers.get("Content-Type")?? "application/octet-stream",
            width: null,
            height: null,
            alt_text: null
        };
    });
    // Don't cache failures, so a later render can retry.
    promise.catch(() => assetCache.delete(key));
    assetCache.set(key, promise);
    return promise;
}
