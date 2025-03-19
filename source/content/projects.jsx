import React, {useEffect, useState} from 'react';
import {tss} from '../components/common/theme';
import {Heading, Subheading, Subtitle, Title} from '../components/common/typography';
import Project from '../components/project';
import IconButton from '../components/common/iconography';
import useProject from '../components/hooks/project';
import useContainer from '../components/common/hooks/container';
import projects from '../../public/projects.json';

const ROW_COUNT = 3;

const useStyles = tss.create(({theme, open, contentHeight, contentSize, openProject}) => ({
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
        display: "flex",
        gap: "20px",

        "& > *": {
            flex: `0 0 ${contentSize}`
        },

        "@media (max-width: 1000px)": {
            maxHeight: contentSize * ROW_COUNT + 40,
            flexDirection: "column"
        }
    },
    project: {
        zIndex: 1000,

        "& .scrim": {
            display: openProject? "block" : "none",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            inset: 0,
            backgroundColor: theme.neutral.shadow.alpha(0.5).hexa(),
            zIndex: 0
        },
        "& .container": {
            padding: "40px",
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            height: openProject? "90%" : 0,
            transition: "height 300ms ease-in-out",
            backgroundColor: theme.primary.container.hex(),
        }
    }
}));

export default function Projects({}) {
    const [open, setOpen] = useState();

    const [openProject, setOpenProject] = useState(false);
    const [projectContent, setProjectContent] = useState(undefined);
    const {project, closeProject} = useProject();
    const handleClose = () => {
        closeProject();
        setOpenProject(false);
    };
    useEffect(() => {
        if(project) {
            console.log(projects.find(({directory}) => directory === project));
            setProjectContent(projects.find(({directory}) => directory === project));
            setOpenProject(true);
        }
    }, [project]);

    const [contentHeight, setContentHeight] = useState();
    const [contentSize, setContentSize] = useState();
    const {classes} = useStyles({open, contentHeight, contentSize, openProject});

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
            if(width == 1000) {
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

    const {Container} = useContainer();

    return (
        <section id="projects" className={classes.section}>
            <Title>{open? "all projects" : "featured projects"}</Title>
            <div className={classes.content}>
                {rows}
            </div>
            <IconButton onClick={() => setOpen(!open)} icon={open? "keyboard_arrow_up" : "keyboard_arrow_down"} />
            {openProject && 
                <div className={classes.project}>
                    <div className="scrim" onClick={handleClose} />
                    <Container role="primary" type="container">
                        <div className="container">
                            <Title>{projectContent.name}</Title>
                            <Subtitle>{projectContent.type}</Subtitle>
                        </div>
                    </Container>
                </div>
            }
        </section>
    );
}