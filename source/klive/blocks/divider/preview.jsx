"use client"
import {tss} from '../../../components/common/theme';

const useStyles = tss.create(({theme, spacing}) => ({
    divider: {
        padding: `${spacing}px 0`
    },
    rule: {
        margin: 0,
        border: "none",
        borderTop: `1px solid ${theme.secondary.accent.alpha(0.4).hexa()}`
    }
}));

export default function DividerPreview({config}) {
    const {classes} = useStyles({spacing: config.spacing_px});
    return (
        <div className={classes.divider}>
            {config.style === "line" && <hr className={classes.rule} />}
        </div>
    );
}
