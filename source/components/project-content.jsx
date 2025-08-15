import {tss} from './common/theme';
import IconButton from './common/iconography';
import Transition from './common/transition';
import Image from './common/image';
import Video from './common/video';
import {Formatted, Subtitle, Title} from './common/typography';
import useContainer from './common/hooks/container';

const useStyles = tss.create(({theme, show}) => ({
    project: {
        zIndex: 1000,

        "& .scrim": {
            display: show? "block" : "none",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            inset: 0,
            backgroundColor: theme.neutral.shadow.alpha(0.5).hexa(),
            zIndex: 0
        },
    },
    container: {
        padding: "0px 40px",
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        transition: "max-height 300ms ease-in-out",
        backgroundColor: theme.primary.container.hex(),
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
        }
    },
    info: {
        margin: "auto",
        padding: "40px 0px 0px 0px",
        maxWidth: "1000px"
    },
    gallery: {
        padding: "40px 0px",
        margin: "auto",
        maxWidth: "1000px",
        display: "flex",
        flexWrap: "wrap",
        gap: "10px"
    }
}));

export default function ProjectContent({show, content, handleClose}) {
    const {Container} = useContainer();
    const {classes} = useStyles({show});
    return (
        <div className={classes.project}>
            <div className='scrim' />
            <Transition show={show} enter="enter" exit="exit">
                <div className={classes.container}>
                    <Container role="primary" type="container">
                        <IconButton className="close" icon="close" role="tertiary" onClick={handleClose} />
                        <div className={classes.info}>
                            <Title>{content?.name}</Title>
                            <Subtitle>{content?.type}</Subtitle>
                            <Formatted className='description'>{content?.description}</Formatted>
                        </div>
                        <div className={classes.gallery}>
                            {content?.media.map(({source, alt, type}, index) => {
                                const sourceURL = `https://s3.samrodriguez.co.kalv.io/projects/${content?.directory}/${source}`;
                                return (type === "video"? 
                                    <Video key={index} source={sourceURL} controls autoPlay muted onContextMenu={event => event.preventDefault()} /> :
                                    <Image key={index} source={sourceURL} alt={alt} onContextMenu={event => event.preventDefault()} draggable={false} />
                                )
                            })}
                        </div>
                    </Container>
                </div>
            </Transition>
        </div>
    )
}