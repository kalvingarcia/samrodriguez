"use client"
import {useState} from 'react';
import {tss} from './common/theme';
import Image from '../components/common/image';
import { Label } from './common/typography';
import useProject from './hooks/project';

const useStyles = tss.create(({theme, hovered}) => ({
    project: {
        position: "relative",
        height: "auto",
        aspectRatio: 1,
        backgroundColor: theme.neutral.containerLowest.hex(),
        borderRadius: hovered? "50% 0%" : 0,
        transition: "border-radius 300ms",
        overflow: "hidden"
    },
    thumbnail: {
        width: "100%",
        height: "100%"
    },
    label: {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        fontStyle: "bold",
        backgroundColor: theme.neutral.containerLowest.alpha(0.8).hexa(),
        opacity: hovered? 1 : 0,
        transition: "opacity 300ms ease-in-out"
    }
}));

export default function Project({directory, name, type}) {
    const {openProject} = useProject();
    const [hovered, setHovered] = useState(false);
    const {classes} = useStyles({hovered})
    return (
        <div className={classes.project} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => openProject(directory)}>
            <Image className={classes.thumbnail} source={`https://s3.samrodriguez.co.kalv.io/projects/${directory}/thumbnail.webp`} alt="Project link for opening project info." />
            <Label className={classes.label}>{name}</Label>
        </div>
    )
}