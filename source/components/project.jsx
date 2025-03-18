import React, {useEffect, useState} from 'react';
import {tss} from './common/theme';
import Image from '../components/common/image';

const useStyles = tss.create(({theme}) => ({
    project: {
        width: "100%",
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
    useEffect(() => {
        (async () => {
            setLoading(true);
            setImage((await import(`../../public/images/projects/${directory}/thumbnail.jpg`)).default);
            setLoading(false);
        })();
    }, []);

    const {classes} = useStyles({})
    return (
        <div className={classes.project}>
            {!loading && image && <Image className={classes.thumbnail} source={image} alt="Project link for opening project info." />}
        </div>
    )
}