"use client"
import {tss} from '../../../components/common/theme';
import Asset from '../shared/asset';
import Caption from '../shared/caption';

const useStyles = tss.create(() => ({
    figure: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    // The site's Image fills its box with objectFit cover; leaving height unset keeps
    // the media's own aspect ratio at full width. Corners stay square to match the site,
    // so the render-config's `rounded_corners` is intentionally not applied.
    media: {
        width: "100%"
    }
}));

/** A single uploaded image or video, chosen by the asset's mime type. */
export default function MediaPreview({attrs, config, assetsById}) {
    const {classes} = useStyles();
    const asset = attrs.asset_id? assetsById.get(attrs.asset_id) : undefined;
    if(!asset) return null;
    return (
        <figure className={classes.figure}>
            {config.caption_position === "above" && <Caption>{attrs.caption}</Caption>}
            <Asset className={classes.media} asset={{...asset, alt_text: attrs.alt_text || asset.alt_text}} />
            {config.caption_position !== "above" && <Caption>{attrs.caption}</Caption>}
        </figure>
    );
}
