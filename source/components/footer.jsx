"use client"
import {tss} from './common/theme';
import useContainer from './common/hooks/container';
import {Label}  from './common/typography';
import IconButton from './common/iconography';
import Button from './common/button';

const useStyles = tss.create(({theme}) => ({
    footer: {
        padding: "40px",
        width: "100%",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: theme.tertiary.container.hex()
    },
    socials: {
        margin: "auto",
        width: "100%",
        maxWidth: "1000px",
        justifyContent: "flex-end",
        display: "flex",
        gap: "10px"
    },
    link: {
        textDecoration: "none"
    },
    credits: {
        alignSelf: "center",
        fontSize: "0.85rem",
        opacity: "0.75",

        "& a:hover": {
            color: theme.secondary.onContainer.hex()
        }
    }
}));

export default function Footer({}) {
    const {Container} = useContainer();
    const {classes} = useStyles({});
    return (
        <Container role="primary" type="container">
            <footer className={classes.footer}>
                <div className={classes.socials}>
                    <a className={classes.link} href="/resume.pdf" download="resume.pdf">
                        <Button icon="download" role="secondary" appearance="filled">My Resume</Button>
                    </a>
                    <a className={classes.link} href='https://linkedin.com/in/samrodriguezdesign' target='_blank'><IconButton iconClass="sam-icons" icon="linkedin" appearance="text" /></a>
                </div>
                <Label className={classes.credits}>designed by sam rodriguez and built by <a href="https://www.kalvingarcia.com">kalvin garcia</a></Label>
            </footer>
        </Container>
    );
}