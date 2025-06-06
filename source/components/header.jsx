"use client"
import { useEffect, useState } from 'react';
import {setCookie} from 'cookies-next';
import {tss, useDarkMode} from './common/theme';
import useContainer from './common/hooks/container';
import {Label} from './common/typography';
import IconButton, {Icon} from './common/iconography';

const cookieOptions = {
    domain: "samrodriguez.co", 
    maxAge: 3156000000,
    sameSite: true,
    secure: true
}

const useStyles = tss.create(({theme, scrolled, hovered, open}) => ({
    scrollLock: {
        overflow: "hidden"
    },
    header: {
        position: "sticky",
        padding: "0px 40px",
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled || hovered || open? theme.primary.accent.hex() : theme.neutral.background.hex()
    },
    content: {
        margin: "auto",
        width: "100%",
        maxWidth: "1000px",
        height: "75px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    logo: {
        display: "flex",
        alignItems: "center",

        "& .icon": {
            fontSize: "50px"
        },
        "& .text": {
            fontFamily: "var(--display-font)",
            fontSize: "1.45rem",
            marginLeft: "-20px",
            marginTop: "-7px"
        }
    },
    hamburger: {
        "& .scrim": {
            display: open? "block" : "none",
            position: "fixed",
            width: "100vw",
            height: "100vh",
            inset: 0,
            backgroundColor: theme.neutral.shadow.alpha(0.5).hexa(),
            zIndex: 0
        },
        "& .button": {
            zIndex: 1000,
            "@media (min-width: 1080px)": {
                display: "none"
            }
        },
        "& .container": {
            display: "flex",
            alignItems: "center",
            gap: "20px",
            overflow: "hidden",

            "@media (max-width: 1080px)": {
                position: "fixed",
                inset: 0,
                width: "100%",
                aspectRatio: 1,
                flexDirection: "column",
                backgroundColor: theme.primary.container.hex(),
                clipPath: open? "circle(min(100%, 500px) at 100% 0)" : "circle(0 at 100% 0)",
                transition: "clip-path 300ms ease-in-out",

                "& > *": {
                    alignSelf: "flex-end",
                    position: "relative",
                    top: "100px",
                    right: "100px"
                }
            }
        }
    },
    navlinks: {
        display: "flex",
        alignItems: "center",
        gap: "20px",

        "@media (max-width: 1080px)": {
            flexDirection: "column"
        },

        "& a:hover": {
            color: theme.secondary.onAccent.hex()
        }
    }
}));

export default function Header({}) {
    const {darkMode, toggleDarkMode} = useDarkMode();
    const handleDarkMode = () => {
        setCookie("samPortfolioDarkMode", !darkMode, cookieOptions);
        toggleDarkMode();
    };

    const [hovered, setHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const checkScroll = ({target}) => {
        setScrolled((target.scrollTop > 0));
    };
    useEffect(() => {
        const root = document.body;
        root?.addEventListener("scroll", checkScroll);
        return () => root?.removeEventListener("scroll", checkScroll);
    }, []);

    const [open, setOpen] = useState(false);

    const {Container} = useContainer();
    const {classes} = useStyles({scrolled, hovered, open});

    const toggleHamburger = () => {
        setOpen(!open);
        if(!open) document.body.classList.add(classes.scrollLock);
        else document.body.classList.remove(classes.scrollLock)
    };

    return (
        <header className={classes.header} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div className={classes.content}>
                <Container role={open? "primary" : scrolled || hovered? "primary" : "neutral"} type={scrolled || hovered? "accent" : "container"}>
                    <div className={classes.logo}>
                        <Icon className="icon" iconClass="sam-icons" icon="logo" />
                        <Label className="text">am rodriguez</Label>
                    </div>
                </Container>
                <div className={classes.hamburger}>
                    <div className="scrim" onClick={() => {setOpen(false); document.body.classList.remove(classes.scrollLock)}} />
                    <IconButton className="button" icon={open? "close" : "menu"} role={open? "secondary" : "secondary"} onClick={toggleHamburger} />
                    <div className="container">
                        <Container role={open? "primary" : scrolled || hovered? "primary" : "neutral"} type={!open & (scrolled || hovered)? "accent" : "container"}>
                            <div className={classes.navlinks}>
                                <Label><a href="#about">about</a></Label>
                                <Label><a href="#projects">work</a></Label>
                                <Label><a href="#contact">contact</a></Label>
                            </div>
                            <IconButton icon={darkMode? "dark_mode" : "light_mode"} role="tertiary" appearance='outlined' onClick={handleDarkMode} />
                        </Container>
                    </div>
                </div>
            </div>
        </header>
    );
}