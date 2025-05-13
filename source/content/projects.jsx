"use client"
import {useEffect, useState} from 'react';
import {tss} from '../components/common/theme';
import {Title} from '../components/common/typography';
import Project from '../components/project';
import ProjectContent from '../components/project-content';
import IconButton from '../components/common/iconography';
import useProject from '../components/hooks/project';
import projects from '../../public/projects.json';

const ROW_COUNT = 3;

const useStyles = tss.create(({theme, open, contentHeight, contentSize}) => ({
    section: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        backgroundColor: theme.neutral.container.hex()
    },
    title: {
        color: theme.primary.accent.darken(0.15).hex()
    },
    content: {
        width: "100%",
        maxWidth: "1000px",
        height: open? contentHeight : 0,
        minHeight: contentSize,
        transition: `height ${Math.max(300, contentHeight / 3)}ms`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "20px",

        "& > *": {
            flex: "0 0 auto"
        },

        "@media (max-width: 1000px)": {
            minHeight: contentSize * ROW_COUNT + 40
        }
    },
    row: {
        width: "100%",
        maxHeight: contentSize,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",

        "@media (max-width: 1000px)": {
            maxHeight: contentSize * ROW_COUNT + 40,
            gridTemplateColumns: "1fr",
        }
    }
}));

export default function Projects({}) {
    const [open, setOpen] = useState(true);
    const [openProject, setOpenProject] = useState(false);
    const [projectContent, setProjectContent] = useState(undefined);
    const {project, closeProject} = useProject();
    const handleClose = () => {
        closeProject();
        setOpenProject(false);
    };
    useEffect(() => {
        if(project) {
            setOpenProject(true);
            setProjectContent(projects.find(({directory}) => directory === project));
        }
    }, [project]);
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
                        <Project key={project.directory} {...project} />
                    ))}
                </div>
            );
        }
        return rows;
    });
    useEffect(() => {    
        const checkWindowSize = () => {
            const width = Math.min(1000, window.innerWidth);
            if(width === 1000) {
                setContentSize((width  - 40) / ROW_COUNT);
                setContentHeight((((width  - 40) / ROW_COUNT) * rows.length) + (20 * (rows.length - 1)));
            } else {
                setContentSize(width);
                setContentHeight(((width * ROW_COUNT + 40) * rows.length) + (20 * (rows.length - 1)));
            }
        };
        checkWindowSize();

        window.addEventListener("resize", checkWindowSize);
        return () => window.removeEventListener("resize", checkWindowSize);
    }, []);

    return (
        <section id="projects" className={classes.section}>
            <Title className={classes.title}>{open? "my projects" : "featured projects"}</Title>
            <div className={classes.content}>
                {rows}
            </div>
            <IconButton onClick={() => setOpen(!open)} icon={open? "keyboard_arrow_up" : "keyboard_arrow_down"} />
            <ProjectContent show={openProject} content={projectContent} handleClose={handleClose} />
        </section>
    );
}