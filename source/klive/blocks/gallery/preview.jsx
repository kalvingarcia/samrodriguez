"use client"
import {tss} from '../../../components/common/theme';
import {computeGridLayout, computeFlexRows} from './layout';
import {useElementWidth} from '../shared/use-element-width';
import Asset from '../shared/asset';
import Caption from '../shared/caption';

const useStyles = tss.create(({gap}) => ({
    figure: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridAutoRows: "120px",
        gap: `${gap}px`
    },
    row: {
        display: "flex",
        gap: `${gap}px`
    },
    cell: {
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover"
    }
}));

export default function GalleryPreview({attrs, config, assetsById}) {
    const {ref, width} = useElementWidth(640);
    const {classes} = useStyles({gap: config.gap_px});
    const images = (attrs.asset_ids?? [])
        .map(id => assetsById.get(id))
        .filter(Boolean)
        .map(asset => ({asset_id: asset.id, width_px: asset.width, height_px: asset.height}));

    if(images.length === 0) return <div ref={ref} />;

    if(config.variant === "flex-rows") {
        const rows = computeFlexRows(images, width, config);
        return (
            <figure ref={ref} className={classes.figure}>
                {config.caption_position === "above" && <Caption>{attrs.caption}</Caption>}
                {rows.map((row, i) => (
                    <div key={i} className={classes.row}>
                        {row.items.map(item => (
                            <div key={item.asset_id} style={{width: item.widthPx, height: row.heightPx}}>
                                <Asset className={classes.cell} asset={assetsById.get(item.asset_id)} ambient />
                            </div>
                        ))}
                    </div>
                ))}
                {config.caption_position !== "above" && <Caption>{attrs.caption}</Caption>}
            </figure>
        );
    }

    const cells = computeGridLayout(images, config);
    return (
        <figure ref={ref} className={classes.figure}>
            {config.caption_position === "above" && <Caption>{attrs.caption}</Caption>}
            <div className={classes.grid}>
                {cells.map(cell => (
                    <div key={cell.asset_id} style={{gridColumn: `span ${cell.colSpan}`, gridRow: `span ${cell.rowSpan}`}}>
                        <Asset className={classes.cell} asset={assetsById.get(cell.asset_id)} ambient />
                    </div>
                ))}
            </div>
            {config.caption_position !== "above" && <Caption>{attrs.caption}</Caption>}
        </figure>
    );
}
