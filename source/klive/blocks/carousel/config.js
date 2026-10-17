export const CAROUSEL_DEFAULTS = {
    autoplay: false,
    autoplay_interval_ms: 4000,
    transition: "slide",
    aspect_ratio: "16:9",
    caption_position: "below",
    loop: true,
    images_per_slide: 1,
    skip_count: 1,
    center_focus: true,
    spacing_px: 8
};

export function aspectRatioValue(ar) {
    if(ar === "16:9") return "16/9";
    if(ar === "4:3") return "4/3";
    if(ar === "1:1") return "1/1";
    return undefined;
}
