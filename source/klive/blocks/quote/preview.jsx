"use client"
import {tss} from '../../../components/common/theme';
import {Body, Label} from '../../../components/common/typography';

const useStyles = tss.create(({theme, centered}) => ({
    quote: {
        padding: centered? "10px 0" : "5px 0 5px 20px",
        borderLeft: centered? "none" : `3px solid ${theme.secondary.accent.hex()}`,
        textAlign: centered? "center" : "left"
    },
    text: {
        fontSize: "1.25rem",
        fontStyle: "italic"
    },
    attribution: {
        marginTop: "10px",
        color: theme.secondary.accent.hex()
    }
}));

export default function QuotePreview({attrs, config}) {
    const {classes} = useStyles({centered: config.style === "centered"});
    if(!attrs.text) return null;
    return (
        <blockquote className={classes.quote}>
            <Body className={classes.text}>&ldquo;{attrs.text}&rdquo;</Body>
            {attrs.attribution && <Label className={classes.attribution}>— {attrs.attribution}</Label>}
        </blockquote>
    );
}
