import {tss} from './common/theme';
import IconButton from './common/iconography';
import Transition from './common/transition';
import Image from './common/image';
import Video from './common/video';
import {Formatted, Subtitle, Title, Subheading} from './common/typography';
import useContainer from './common/hooks/container';

const useStyles = tss.create(({theme, show}) => ({
    scrim: {
        display: show? "block" : "none",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        inset: 0,
        backgroundColor: theme.neutral.shadow.alpha(0.5).hexa(),
        zIndex: 1000
    },
    project: {
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 999999,
        backgroundColor: theme.primary.container.hex(),
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        transition: "max-height 300ms ease-in-out",
        overflowX: "hidden",
        overflowY: "auto",
        "&.enter": {
            maxHeight: 0
        },
        "&.exit": {
            maxHeight: 0
        }
    },
    container: {
        margin: "auto",
        padding: "40px 40px 0px 40px",
        width: "100%",
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column"
    },
    header: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    info: {
        display:  "flex",
        flexDirection: "column",
        gap: "5px",

        "& .title": {
            color:  theme.secondary.accent.hex()
        }
    },
    content: {
        display: "flex",
        gap: "40px",
        justifyContent: "flex-start",
        alignItems: "flex-start",

        "& .description": {
            maxWidth: "300px"
        },

        "@media (max-width: 1000px)": {
            padding: "40px 0px",
            gap: 0,
            flexDirection: "column-reverse",

            "& .description": {
                maxWidth: "100%"
            }
        }
    },
    gallery: {
        display: "flex",
        flexWrap: "wrap",
        paddingBottom: "40px"
    }
}));

export default function ProjectContent({show, content, handleClose}) {
    const {Container} = useContainer();
    const {classes} = useStyles({show});
    return (
        <>
            <div className={classes.scrim} />
            <Transition show={show} enter="enter" exit="exit">
                <div className={classes.project}>
                    <div className={classes.container}>
                        <Container role="primary" type="container">
                            <div className={classes.header}>
                                <div className={classes.info}>
                                    <Title className="title">{content?.name}</Title>
                                    <Subtitle>{content?.type}</Subtitle>
                                    <Subheading>{content?.date}</Subheading>
                                </div>
                                <IconButton className="close" icon="close" role="tertiary" onClick={handleClose} />
                            </div>
                            <div className={classes.content}>
                                <Formatted className='description'>{content?.description}</Formatted>
                                <div className={classes.gallery}>
                                    {content?.media.map(({source, alt, type}, index) => {
                                        const sourceURL = `https://s3.samrodriguez.co.kalv.io/projects/${content?.directory}/${source}`;
                                        return (type === "video"? 
                                            <Video key={index} source={sourceURL} controls autoPlay muted onContextMenu={event => event.preventDefault()} /> :
                                            <Image key={index} source={sourceURL} alt={alt} onContextMenu={event => event.preventDefault()} draggable={false} />
                                        )
                                    })}
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            </Transition>
        </>
        
    )
}