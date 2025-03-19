import React from 'react';
import {tss} from '../components/common/theme';
import {Body, Display} from '../components/common/typography';
import Button from '../components/common/button';
import Image from '../components/common/image';
import profile from '../../public/images/profile.jpg';

const useStyles = tss.create(({theme}) => ({
    section: {
        width: "100%",
        height: "fit-content",
    },
    content: {
        padding: "40px",
        width: "100%",
        height: "650px",
        backgroundColor: theme.neutral.containerHighest.hex()
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
    wave: {
        width: "100%",
        height: "200px",
        fill: theme.neutral.containerHighest.hex()
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
    }
}));

export default function About({}) {
    const {classes} = useStyles({});
    return (
        <section id="about" className={classes.section}>
            <div className={classes.content}>
                <div className={classes.container}>
                    <Image className={classes.image} source={profile} alt="Portraiit of Sam" />
                    <div className={classes.bio}>
                        <Display className={classes.intro}>hi, i'm sam!</Display>
                        <Body>i'm a graphic designer who is passionate about branding, packaging, and motion graphics.</Body>
                        <Button className="learnMore">learn more!</Button>
                    </div>
                </div>
            </div>
            <svg className={classes.wave} xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink" preserveAspectRatio='none' viewBox="0 0 900 300" version="1.1">
                <path xmlns="http://www.w3.org/2000/svg" d="M0 192L50 207C100 222 200 252 300 242.5C400 233 500 184 600 161.3C700 138.7 800 142.3 850 144.2L900 146L900 0L850 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0L0 0Z" strokeLinecap="round" strokeLinejoin="miter"/>
            </svg>
        </section>
    );
}