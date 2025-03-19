import React, {useEffect, useState} from 'react';
import {tss} from './common/theme';
import Image from '../components/common/image';

const useStyles = tss.create(({theme, contentSize}) => ({
    project: {
        width: "contentSize",
        height: "auto",
        aspectRatio: 1,
        backgroundColor: theme.neutral.containerLowest.hex()
    },
    thumbnail: {
        width: "100%",
        height: "100%"
    }
}));

export default function Project({directory}) {
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(undefined);
    const [contentSize, setContentSize] = useState();
    useEffect(() => {
        (async () => {
            setLoading(true);
            setImage((await import(`../../public/images/projects/${directory}/thumbnail.jpg`)).default);
            setLoading(false);
        })();

        const checkWindowSize = () => {
            const width = Math.min(1000, window.innerWidth);
            setContentSize(width / 3);
            console.log(width / 3);
        };
        checkWindowSize();

        window.addEventListener("resize", checkWindowSize);
        return () => window.removeEventListener("resize", checkWindowSize);
    }, []);

    const {classes} = useStyles({contentSize})
    return (
        <div className={classes.project}>
            {!loading && image && <Image className={classes.thumbnail} source={image} alt="Project link for opening project info." />}
        </div>
    )
}