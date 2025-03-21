"use client"
import {useEffect, useState} from 'react';
import {tss} from '../components/common/theme';
import {Body, Heading, Subheading, Subtitle, Title} from '../components/common/typography';
import Project from '../components/project';
import IconButton from '../components/common/iconography';
import useProject from '../components/hooks/project';
import useContainer from '../components/common/hooks/container';
import Transition from '../components/common/transition';
import Image from '../components/common/image';
import Video from '../components/common/video';
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
            position: "fixed",
            left: 0,
            bottom: 0,
            width: "100%",
            maxHeight: "100%",
            transition: "max-height 300ms ease-in-out",
            backgroundColor: theme.primary.accent.hex(),
            overflow: "auto",

            "&.enter": {
                maxHeight: 0
            },
            "&.exit": {
                maxHeight: 0
            },

            "& .close": {
                position: "absolute",
                top: "40px",
                right: "40px",
                zIndex: 1000
            },
            "& .info": {
                padding: "40px",

                "& .description": {
                    fontFamily: "inherit",
                    textWrap: "pretty"
                }
            },
            "& .gallery": {
                margin: "auto",
                maxWidth: "1000px"
            }
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
            setOpenProject(true);
            setProjectContent(projects.find(({directory}) => directory === project));
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
            <div className={classes.project}>
                <Transition show={openProject} enter="enter" exit="exit">
                    <div className="container">
                        <Container role="primary" type="accent">
                            <IconButton className="close" icon="close" role="tertiary" appearance="tonal" onClick={handleClose} />
                            <div className="info">
                                <Title>{projectContent?.name}</Title>
                                <Subtitle>{projectContent?.type}</Subtitle>
                                <Body><pre className='description'>{projectContent?.description}</pre></Body>
                            </div>
                            <div className="gallery">
                                {projectContent?.media.map(({source, alt, type}, index) => (
                                    type === "video"? 
                                        <Video key={index} source={`/images/projects/${projectContent?.directory}/${source}`} controls muted />
                                        :
                                        <Image key={index} source={`/images/projects/${projectContent?.directory}/${source}`} alt={alt} />
                                ))}
                            </div>
                        </Container>
                    </div>
                </Transition>
            </div>
        </section>
    );
}