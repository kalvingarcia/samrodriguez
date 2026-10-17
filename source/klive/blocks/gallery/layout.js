// Copied from klive-dashboard/dashboard/lib/blocks/gallery/layout.ts (types stripped).

export function getOrientation(w, h) {
    if(!w || !h) return "square";
    const r = w / h;
    if(r > 1.15) return "landscape";
    if(r < 0.87) return "portrait";
    return "square";
}

// --- Grid-hybrid: position-tier pattern + per-image orientation → concrete span ---

/** How far an image's aspect ratio sits from square, in log-space so a 2:1 landscape
 * and a 1:2 portrait score identically — a wide or tall image reads better spanning
 * multiple grid cells than a near-square one does. */
function aspectExtremity(image) {
    if(!image.width_px || !image.height_px) return 0;
    return Math.abs(Math.log(image.width_px / image.height_px));
}

export function computeGridLayout(images, config) {
    const pattern = config.pattern.length? config.pattern : ["small"];
    // The pattern controls what FRACTION of images get the "large" treatment; WHICH
    // images get it is chosen by their own aspect ratio, without reordering the array.
    const largeRatio = pattern.filter(t => t === "large").length / pattern.length;
    const largeCount = Math.round(images.length * largeRatio);
    const largeIndices = new Set(
        images
            .map((image, i) => ({i, score: aspectExtremity(image)}))
            .sort((a, b) => b.score - a.score)
            .slice(0, largeCount)
            .map(x => x.i)
    );

    return images.map((image, i) => {
        if(!largeIndices.has(i)) return {asset_id: image.asset_id, colSpan: 1, rowSpan: 1};
        const orientation = getOrientation(image.width_px, image.height_px);
        const spanKey = orientation === "landscape"? config.large_span_landscape
            : orientation === "portrait"? config.large_span_portrait
            : config.large_span_square;
        const [c, r] = spanKey.split("x").map(Number);
        return {asset_id: image.asset_id, colSpan: c, rowSpan: r};
    });
}

// --- Flex-rows: classic greedy justified-row packing (Flickr-style) ---

export function computeFlexRows(images, containerWidthPx, config) {
    const target = config.target_row_height_px;
    const gap = config.gap_px;
    const rows = [];
    let row = [];
    let ratioSum = 0;

    const flushRow = scale => {
        rows.push({
            items: row.map(item => ({asset_id: item.asset_id, widthPx: item.ratio * target * scale})),
            heightPx: target * scale
        });
        row = [];
        ratioSum = 0;
    };

    for(const image of images) {
        const ratio = image.width_px && image.height_px? image.width_px / image.height_px : 1;
        row.push({asset_id: image.asset_id, ratio});
        ratioSum += ratio;
        const widthAtTarget = ratioSum * target + gap * (row.length - 1);
        if(widthAtTarget >= containerWidthPx && containerWidthPx > 0) {
            const scale = (containerWidthPx - gap * (row.length - 1)) / (ratioSum * target);
            flushRow(scale);
        }
    }
    if(row.length) {
        const justify = config.last_row_behavior === "justify" && row.length > 1;
        const scale = justify && containerWidthPx > 0
            ? (containerWidthPx - gap * (row.length - 1)) / (ratioSum * target)
            : 1;
        flushRow(scale);
    }
    return rows;
}
