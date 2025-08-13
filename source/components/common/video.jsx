"use client"
import { useEffect, useState } from 'react';
import {tss} from './theme';

const useStyles = tss.create(({theme}) => ({
    video: {
        overflow: "hidden",
        width: "100%",
        height: "100%"
    }
}));

export default function Image({className, source, ...props}) {
    const [sourceRef, setSourceRef] = useState(undefined);
    useEffect(() => {
        (async () => {
            if(sourceRef) {
                const blob = await fetch(source).then(response => response.blob());
                console.log(blob)
                sourceRef.src = URL.createObjectURL(blob);
            }
        })();
    }, [sourceRef]);

    const {cx, classes} = useStyles();
    return (
        <video ref={setSourceRef} className={cx(classes.video, className)} {...props}>
            {/* <source ref={setSourceRef} type="video/mp4" /> */}
            Your browser does not support the video tag.
        </video>
    );
}