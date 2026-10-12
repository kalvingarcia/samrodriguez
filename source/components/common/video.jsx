"use client"
import {tss} from './theme';

const useStyles = tss.create(({theme}) => ({
    video: {
        overflow: "hidden",
        width: "100%",
        height: "100%"
    }
}));

export default function Video({className, source, mimeType = "video/mp4", ...props}) {
    const {cx, classes} = useStyles();
    return (
        <video className={cx(classes.video, className)} {...props}>
            <source src={source} type={mimeType} />
            Your browser does not support the video tag.
        </video>
    );
}