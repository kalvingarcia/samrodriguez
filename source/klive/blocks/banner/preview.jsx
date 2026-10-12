"use client"
import {tss} from '../../../components/common/theme';
import {renderNode} from '../render-nodes';

const useStyles = tss.create(({theme, heightVh, parallax, contentBackground, image}) => ({
    banner: {
        // Bleeds past the project popup's 40px side padding to span its full width.
        marginLeft: "-40px",
        marginRight: "-40px",
        width: "calc(100% + 80px)",
        height: `${heightVh}vh`,
        minHeight: "160px",
        backgroundImage: image,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: parallax? "fixed" : "scroll",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
    },
    overlay: {
        position: "relative",
        padding: "20px 40px",
        textAlign: "center",
        textShadow: contentBackground? "none" : `0 1px 4px ${theme.neutral.shadow.alpha(0.6).hexa()}`,
        backgroundColor: contentBackground? theme.primary.container.alpha(0.6).hexa() : "transparent"
    }
}));

/** Shared by heroBlock and bannerBlock — a full-width background image with optional content over it. */
export default function BannerLikePreview({attrs, config, assetsById, content, ctx}) {
    const asset = attrs.asset_id? assetsById.get(attrs.asset_id) : undefined;
    // Quote the url and escape backslashes/quotes so an unusual (but valid) URL can't
    // break out of the CSS string.
    const image = asset? `url("${asset.url.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")` : undefined;
    const {classes} = useStyles({
        heightVh: config.height_vh,
        parallax: config.parallax,
        contentBackground: config.content_background,
        image
    });
    const child = content?.[0];
    // An empty seed paragraph (what the editor inserts by default) shouldn't draw an overlay box.
    const hasContent = child && (child.type !== "paragraph" || child.content?.length);
    return (
        <div className={classes.banner} onContextMenu={event => event.preventDefault()}>
            {hasContent && <div className={classes.overlay}>{renderNode(child, ctx)}</div>}
        </div>
    );
}
