import {tss} from './common/theme';
import IconButton from './common/iconography';
import Transition from './common/transition';
import useContainer from './common/hooks/container';
import {renderNode} from '../klive/blocks/render-nodes';
import {useAssets, useRenderConfig} from '../klive/hooks';

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
    // Zero-height and sticky so the close button sits beside the title (like the old
    // header row) and stays reachable while scrolling, without pushing the body down.
    header: {
        position: "sticky",
        top: 0,
        height: 0,
        zIndex: 2,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-start",
        overflow: "visible"
    },
    body: {
        paddingBottom: "40px",

        // Keep the opening title clear of the close button.
        "& > div > .heading:first-child": {
            paddingRight: "60px"
        }
    }
}));

export default function ProjectContent({show, content, handleClose}) {
    const {Container} = useContainer();
    const {classes} = useStyles({show});
    const assetsById = useAssets(content?.body);
    const config = useRenderConfig();
    return (
        <>
            <div className={classes.scrim} />
            <Transition show={show} enter="enter" exit="exit">
                <div className={classes.project}>
                    <div className={classes.container}>
                        <Container role="primary" type="container">
                            <div className={classes.header}>
                                <IconButton className="close" icon="close" role="tertiary" onClick={handleClose} />
                            </div>
                            {/* The body opens with Sam's own title / type / date headings. */}
                            <div className={classes.body}>
                                {content && renderNode(content.body, {config, assetsById})}
                            </div>
                        </Container>
                    </div>
                </div>
            </Transition>
        </>
        
    )
}