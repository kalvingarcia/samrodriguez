import React, { useEffect, useState } from 'react';
import {tss} from './common/theme';
import useContainer from './common/hooks/container';
import {Label} from './common/typography';

const useStyles = tss.create(({theme, scrolled, hovered}) => ({
    header: {
        position: "sticky",
        padding: "0px 40px",
        top: 0,
        zIndex: 1000,
        backgroundColor: scrolled || hovered? theme.neutral.containerLowest.hex() : theme.primary.container.hex(),
    },
    content: {
        margin: "auto",
        width: "100%",
        maxWidth: "1000px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",
    },
    navlinks: {
        display: "flex",
        alignItems: "center",
        gap: "20px"
    }
}));

export default function Header({}) {
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
                    <Label>Sam Rodriguez</Label>
                    <div className={classes.navlinks}>
                        <Label>Work</Label>
                        <Label>About</Label>
                        <Label>Contact</Label>
                    </div>
                </div>
            </header>
        </Container>
    );
}