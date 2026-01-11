"use client"
import {tss} from '../components/common/theme';
import {Body, Display} from '../components/common/typography';
import Button from '../components/common/button';
import Image from '../components/common/image';

const useStyles = tss.create(({theme}) => ({
    section: {
        width: "100%"
    },
    content: {
        padding: "40px",
        width: "100%",
    },
    container: {
        margin: "auto",
        width: "100%",
        maxWidth: "1000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "100px",

        "@media (max-width: 1080px)": {
            flexDirection: "column",
            gap: "20px"
        }
    },
    image: {
        flex: "1 0 fit-content",
        width: "100%",
        maxWidth: "500px",
        borderRadius: "50% 0%"
    },
    bio: {
        flex: "0 1 auto",
        width: "100%",
        maxWidth: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
    },
    intro: {
        color: theme.secondary.accent.hex()
    },
    body: {
        fontSize: "1.25rem"
    }
}));

export default function About({}) {
    const {classes} = useStyles({});
    return (
        <section id="about" className={classes.section}>
            <div className={classes.content}>
                <div className={classes.container}>
                    <Image className={classes.image} source="https://s3.samrodriguez.co.kalv.io/profile.webp" alt="Portraiit of Sam" onContextMenu={event => event.preventDefault()} draggable={false} />
                    <div className={classes.bio}>
                        <Display className={classes.intro}>Hi, i'm Sam!</Display>
                        <Body className={classes.body}>I'm a graphic designer specializing in branding, motion graphics, and illustration. I love blending different mediums together to create unique visual identities.</Body>
                        {/* <Button className="learnMore">learn more!</Button> */}
                    </div>
                </div>
            </div>

        </section>
    );
}