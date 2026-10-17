"use client"
import {useState} from 'react';
import {tss} from './common/theme';
import { Label } from './common/typography';
import useProject from './hooks/project';
import Asset from '../klive/blocks/shared/asset';
import {useAsset} from '../klive/hooks';

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
        height: "100%",
        objectFit: "cover"
    },
    label: {
        padding: "20px",
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: "1.5rem",
        fontStyle: "bold",
        backgroundColor: theme.neutral.containerLowest.alpha(0.8).hexa(),
        opacity: hovered? 1 : 0,
        transition: "opacity 300ms ease-in-out"
    }
}));

export default function Project({slug, title, cover}) {
    const {openProject} = useProject();
    const thumbnail = useAsset(cover, "thumb");
    const [hovered, setHovered] = useState(false);
    const {classes} = useStyles({hovered})
    return (
        <div className={classes.project} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => openProject(slug)}>
            <Asset className={classes.thumbnail} asset={thumbnail && {...thumbnail, alt_text: "Project link for opening project info."}} ambient />
            <Label className={classes.label}>{title}</Label>
        </div>
    )
}