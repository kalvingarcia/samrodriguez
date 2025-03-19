import React, { useEffect, useState } from 'react';
import {tss, useDarkMode} from './common/theme';
import useContainer from './common/hooks/container';
import {Label} from './common/typography';
import IconButton, {Icon} from './common/iconography';

const useStyles = tss.create(({theme, scrolled, hovered}) => ({
    header: {
        position: "sticky",
        padding: "0px 40px",
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled || hovered? theme.neutral.containerLowest.hex() : theme.neutral.containerHighest.hex(),
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
            fontSize: "1.25rem",
            marginLeft: "-20px",
            marginTop: "-5px",

            "@media (max-width: 1080px)": {
                display: "none"
            }
        }
    },
    navlinks: {
        display: "flex",
        alignItems: "center",
        gap: "20px"
    }
}));

export default function Header({}) {
    const {darkMode, toggleDarkMode} = useDarkMode();

    const [hovered, setHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const checkScroll = ({target}) => {
        setScrolled((target.scrollTop > 0));
    };
    useEffect(() => {
        const root = document.getElementById("root");
        root?.addEventListener("scroll", checkScroll);
        return () => root?.removeEventListener("scroll", checkScroll);
    }, []);

    const {Container} = useContainer();

    const {classes} = useStyles({scrolled, hovered});
    return (
        <Container role={scrolled || hovered? "neutral" : "primary"} type="container">
            <header className={classes.header} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <div className={classes.content}>
                    <div className={classes.logo}>
                        <Icon className="icon" iconClass="sam-icons" icon="logo" />
                        <Label className="text">am rodriguez</Label>
                    </div>
                    <div className={classes.navlinks}>
                        <Label><a href="#about">about</a></Label>
                        <Label><a href="#projects">work</a></Label>
                        <Label><a href="#contact">contact</a></Label>
                        <IconButton icon={darkMode? "dark_mode" : "light_mode"} role="tertiary" appearance='tonal' onClick={toggleDarkMode} />
                    </div>
                </div>
            </header>
        </Container>
    );
}