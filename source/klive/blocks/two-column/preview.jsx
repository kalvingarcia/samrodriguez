"use client"
import {tss} from '../../../components/common/theme';
import {ratioToFr} from './config';
import {Flow} from '../render-nodes';

const useStyles = tss.create(({left, right, gap}) => ({
    columns: {
        display: "grid",
        gridTemplateColumns: `${left}fr ${right}fr`,
        gap: `${gap}px`,
        alignItems: "start",

        // Stacks at the same breakpoint the rest of the site switches layouts at.
        "@media (max-width: 1000px)": {
            gridTemplateColumns: "1fr"
        }
    },
    column: {
        minWidth: 0
    }
}));

export function TwoColumnPreview({config, content, ctx}) {
    const [left, right] = ratioToFr(config.ratio);
    const {classes} = useStyles({left, right, gap: config.gap_px});
    return (
        <div className={classes.columns}>
            {(content?? []).map((column, i) => <ColumnPreview key={i} content={column.content} ctx={ctx} />)}
        </div>
    );
}

/** columnBlock has no render-config of its own — it's purely structural. */
export function ColumnPreview({content, ctx}) {
    const {classes} = useStyles({left: 1, right: 1, gap: 0});
    return <div className={classes.column}><Flow nodes={content} ctx={ctx} /></div>;
}
