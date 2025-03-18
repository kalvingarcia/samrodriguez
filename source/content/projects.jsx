import React, {useEffect, useState} from 'react';
import {tss} from '../components/common/theme';
import Button from '../components/common/button';
import {Title} from '../components/common/typography';
import Project from '../components/project';

const useStyles = tss.create(({theme, open, contentHeight}) => ({
    section: {
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    content: {
        width: "100%",
        maxWidth: "1000px",
        height: open? contentHeight : 0,
        minHeight: "320px",
        transition: "height 300ms ease-in-out",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "20px",

        "& > *": {
            flex: "0 0 auto"
        }
    },
    row: {
        width: "100%",
        maxHeight: "320px",
        display: "flex",
        gap: "20px",

        "& > *": {
            flex: "0 1 auto"
        }
    }
}));

export default function Projects({}) {
    const [open, setOpen] = useState();
    const toggleOpen = () => setTimeout(() => setOpen(!open), 200);

    const [content, setContent] = useState(undefined);
    const [contentHeight, setContentHeight] = useState();
    useEffect(() => {
        if(content && !open) {
            setContentHeight(content.scrollHeight);
            console.log(content.scrollHeight);
        }
    }, [content, open]);

    const {classes} = useStyles({open, contentHeight});
    return (
        <section id="projects" className={classes.section}>
            <Title>{open? "all projects" : "featured projects"}</Title>
            <div ref={setContent} className={classes.content}>
                <div className={classes.row}>
                    <Project directory="santurce-event" />
                    <Project directory="tender-is-the-flesh" />
                    <Project />
                </div>
                <div className={classes.row}>
                    <Project />
                    <Project />
                    <Project />
                </div>
            </div>
            <Button onClick={toggleOpen}>{open? "see lesss" : "see more"}</Button>
        </section>
    );
}