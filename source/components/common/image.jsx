"use client"
import {tss} from './theme';

const useStyles = tss.create(({theme}) => ({
    image: {
        overflow: "hidden",

        "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center"
        }
    }
}));

export default function Image({className, source, ...props}) {
    const {cx, classes} = useStyles();
    return (
        <figure className={cx(classes.image, className?? "")}>
            <img src={source} {...props} />
        </figure>
    );
}