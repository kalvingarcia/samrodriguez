"use client"
import {tss} from '../../../components/common/theme';
import {Label} from '../../../components/common/typography';

const useStyles = tss.create(({theme}) => ({
    caption: {
        display: "block",
        fontSize: "0.9rem",
        fontStyle: "italic",
        color: theme.secondary.onContainer.alpha(0.8).hexa()
    }
}));

/** Caption text for media/gallery/carousel/code blocks; renders nothing when empty. */
export default function Caption({children}) {
    const {classes} = useStyles();
    if(!children) return null;
    return <figcaption><Label className={classes.caption}>{children}</Label></figcaption>;
}
