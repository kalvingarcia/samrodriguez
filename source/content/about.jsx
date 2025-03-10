import React from 'react';
import {tss} from '../components/common/theme';
import {Body, Display} from '../components/common/typography';

const useStyles = tss.create(({theme}) => ({
    section: {
        width: "100%",
        height: "fit-content",
    },
    content: {
        padding: "40px",
        width: "100%",
        height: "500px",
        backgroundColor: theme.primary.container.hex()
    },
    container: {
        margin: "auto",
        width: "100%",
        maxWidth: "1000px",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
    },
    wave: {
        width: "100%",
        height: "200px",
        fill: theme.primary.container.hex()
    },
    image: {
        width: "100%",
        height: "400px",
        backgroundColor: theme.secondary.accent.hex()
    },
    bio: {
        width: "100%",
    }
}));

export default function About({}) {
    const {classes} = useStyles({});
    return (
        <section id="about" className={classes.section}>
            <div className={classes.content}>
                <div className={classes.container}>
                    <div className={classes.image} />
                    <div className={classes.bio}>
                        <Display>Hi, I'm Sam!</Display>
                        <Body>Here is a little bit about me!</Body>
                    </div>
                </div>
            </div>
            <svg className={classes.wave} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" preserveAspectRatio='none' viewBox="0 0 900 300" version="1.1">
                <path xmlns="http://www.w3.org/2000/svg" d="M0 192L50 207C100 222 200 252 300 242.5C400 233 500 184 600 161.3C700 138.7 800 142.3 850 144.2L900 146L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z" stroke-linecap="round" stroke-linejoin="miter"/>
            </svg>
        </section>
    );
}