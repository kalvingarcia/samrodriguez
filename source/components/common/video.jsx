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
    const {cx, classes} = useStyles();
    return (
        <video className={cx(classes.video, className)} {...props}>
            <source src={source} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    );
}