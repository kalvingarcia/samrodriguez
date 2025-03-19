import React, {useEffect, useState} from 'react';
import {tss} from '../components/common/theme';
import Button from '../components/common/button';
import {Title} from '../components/common/typography';
import Project from '../components/project';
import projects from '../../public/projects.json';

const ROW_COUNT = 4;

const useStyles = tss.create(({theme, open, contentHeight, contentSize}) => ({
    section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
    },
    content: {
        width: "100%",
        maxWidth: "1000px",
        height: open? contentHeight : 0,
        minHeight: contentSize,
        transition: "height 300ms ease-in-out",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",

        "& > *": {
            flex: "0 0 auto"
        }
    },
    row: {
        width: "100%",
        maxHeight: contentSize,
        display: "flex",

        "& > *": {
            flex: `0 0 ${contentSize}`
        }
    }
}));

export default function Projects({}) {
    const [open, setOpen] = useState();
    const toggleOpen = () => setTimeout(() => setOpen(!open), 200);

    const [contentHeight, setContentHeight] = useState();
    const [contentSize, setContentSize] = useState();
    const {classes} = useStyles({open, contentHeight, contentSize});

    const [rows] = useState(() => {
        const rows = [];
        for (let i = 0; i < projects.length; i += ROW_COUNT) {
            const chunk = projects.slice(i, i + ROW_COUNT);
            rows.push(
                <div key={i} className={classes.row}>
                    {chunk.map(project => (
                        <Project key={project.directory} directory={project.directory} />
                    ))}
                </div>
            );
        }
        return rows;
    });
    useEffect(() => {    
        const checkWindowSize = () => {
            const width = Math.min(1000, window.innerWidth);
            setContentSize(width / ROW_COUNT);
            setContentHeight((width / ROW_COUNT) * rows.length);
            console.log(width / ROW_COUNT);
        };
        checkWindowSize();

        window.addEventListener("resize", checkWindowSize);
        return () => window.removeEventListener("resize", checkWindowSize);
    }, []);

    return (
        <section id="projects" className={classes.section}>
            <Title>{open? "all projects" : "featured projects"}</Title>
            <div className={classes.content}>
                {rows}
            </div>
            <Button onClick={toggleOpen}>{open? "see lesss" : "see more"}</Button>
        </section>
    );
}