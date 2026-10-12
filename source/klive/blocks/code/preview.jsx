"use client"
import {tss} from '../../../components/common/theme';
import Caption from '../shared/caption';

const useStyles = tss.create(({theme}) => ({
    figure: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    code: {
        margin: 0,
        padding: "20px",
        overflowX: "auto",
        fontFamily: "var(--code-font, monospace)",
        fontSize: "0.85rem",
        lineHeight: 1.5,
        color: theme.secondary.onContainer.hex(),
        backgroundColor: theme.neutral.shadow.alpha(0.25).hexa()
    },
    line: {
        display: "flex",
        gap: "12px"
    },
    number: {
        opacity: 0.4,
        userSelect: "none",
        textAlign: "right"
    }
}));

export default function CodePreview({attrs, config}) {
    const {classes} = useStyles();
    if(!attrs.code) return null;
    const lines = attrs.code.split("\n");
    return (
        <figure className={classes.figure}>
            {config.caption_position === "above" && <Caption>{attrs.caption}</Caption>}
            <pre className={classes.code}>
                <code>
                    {config.show_line_numbers?
                        lines.map((line, i) => (
                            <div key={i} className={classes.line}>
                                <span className={classes.number} style={{minWidth: `${String(lines.length).length}ch`}}>{i + 1}</span>
                                <span>{line}</span>
                            </div>
                        )) :
                        attrs.code}
                </code>
            </pre>
            {config.caption_position !== "above" && <Caption>{attrs.caption}</Caption>}
        </figure>
    );
}
