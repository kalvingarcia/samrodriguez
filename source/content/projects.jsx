"use client"
import {useEffect, useState, useRef} from 'react';
import {tss} from '../components/common/theme';
import {Title} from '../components/common/typography';
import Project from '../components/project';
import ProjectContent from '../components/project-content';
import IconButton from '../components/common/iconography';
import useProject from '../components/hooks/project';
import projects from '../../public/projects.json';

const useStyles = tss.create(({theme, open, contentHeight, contentSize, ROW_COUNT}) => ({
    section: {
        paddingTop: "40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        backgroundColor: theme.neutral.container.hex()
    },
    title: {
        color: theme.secondary.onContainer.hex()
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

        "& > *": {
            flex: "0 0 auto"
        },

        "@media (max-width: 1000px)": {
            minHeight: contentSize * 2,
            maxHeight: contentSize * ROW_COUNT
        }
    },
    row: {
        width: "100%",
        maxHeight: contentSize,
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",

        "@media (max-width: 1000px)": {
            maxHeight: contentSize * ROW_COUNT + 40,
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
        }
    },
    wave: {
        display: "block",
        width: "100%",
        height: "300px",
        fill: theme.neutral.container.hex(),
        backgroundColor: theme.neutral.background.hex()
    },
}));

export default function Projects({}) {
    const [open, setOpen] = useState(Math.min(1000, window.innerWidth) === 1000? false : true);
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
        } else {
            setOpenProject(false)
        }
    }, [project]);
    const [contentHeight, setContentHeight] = useState();
    const [contentSize, setContentSize] = useState();

    const ROW_COUNT = useRef(Math.min(1000, window.innerWidth) === 1000? 3 : 2);
    const {classes} = useStyles({open, contentHeight, contentSize, ROW_COUNT});
    const generateRows = () => {
        const rows = [];
        for (let i = 0; i < projects.length; i += ROW_COUNT.current) {
            const chunk = projects.slice(i, i + ROW_COUNT.current);
            rows.push(
                <div key={i} className={classes.row}>
                    {chunk.map(project => (
                        <Project key={project.directory} {...project} />
                    ))}
                </div>
            );
        }
        return rows;
    }
    const [rows, setRows] = useState(generateRows());
    useEffect(() => {    
        const checkWindowSize = () => {
            const width = Math.min(1000, window.innerWidth);
            ROW_COUNT.current = width === 1000? 3 : 2;
            const rows = generateRows();
            setContentSize((width) / ROW_COUNT.current);
            setContentHeight((((width) / ROW_COUNT.current) * rows.length));
            setRows(rows);
        };
        checkWindowSize();

        window.addEventListener("resize", checkWindowSize);
        return () => window.removeEventListener("resize", checkWindowSize);
    }, []);

    return (
        <section id="projects" className={classes.section}>
            <Title className={classes.title}>{open? "My Projects" : "Featured Projects"}</Title>
            <div className={classes.content}>
                {rows}
            </div>
            <IconButton onClick={() => setOpen(!open)} icon={open? "keyboard_arrow_up" : "keyboard_arrow_down"} role="secondary" />
            <ProjectContent show={openProject} content={projectContent} handleClose={handleClose} />
            <svg className={classes.wave} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" preserveAspectRatio='none' viewBox="0 0 900 350" version="1.1">
                <path xmlns="http://www.w3.org/2000/svg" d="M0 192L50 207C100 222 200 252 300 242.5C400 233 500 184 600 161.3C700 138.7 800 142.3 850 144.2L900 146L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z" strokeLinecap="round" strokeLinejoin="miter"/>
            </svg>
        </section>
    );
}