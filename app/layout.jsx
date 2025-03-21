"use client"
import {useEffect, useState} from "react";
import Local from "next/font/local";
import {getCookie} from "cookies-next";
import {GlobalStyles} from 'tss-react';
import Header from '@/source/components/header';
import Footer from '@/source/components/footer';
import ThemeProvider from '@/source/components/common/theme';

const emerald = "#4AC282";
const cambridge = "#8EB9A8";
const pale = "#E6DBE7";
const teaRose = "#EDB7B9";
const africanViolet = "#BB85B4";

const samIconsFont = Local({
    variable: "--sam-icons",
    src: [{
        path: "../public/fonts/sam-icons.woff",
        weight: "normal",
        style: "normal"
    }]
});

const displayFont = Local({
    variable: "--display-font",
    src: [{
        path: "../public/fonts/lobster-regular.woff2",
        weight: "normal",
        style: "normal"
    }]
});
const titleFont = Local({
    variable: "--title-font",
    src: [{
        path: "../public/fonts/causten-extra-bold.woff2",
        weight: "bold",
        style: "normal"
    }]
});
const headingFont = Local({
    variable: "--heading-font",
    src: [{
        path: "../public/fonts/causten-bold.woff2",
        weight: "bold",
        style: "normal"
    }]
});
const bodyFont = Local({
    variable: "--body-font",
    src: [
        {
            path: "../public/fonts/causten-medium.woff2",
            weight: "normal",
            style: "normal"
        },
        {
            path: "../public/fonts/causten-medium-oblique.woff2",
            weight: "normal",
            style: "oblique"
        },
        {
            path: "../public/fonts/causten-semi-bold.woff2",
            weight: "bold",
            style: "normal"
        },
        {
            path: "../public/fonts/causten-semi-bold-oblique.woff2",
            weight: "bold",
            style: "oblique"
        },
    ]
});

export default function Layout({children}) {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <html lang="en" className={[samIconsFont.variable, displayFont.variable, titleFont.variable, headingFont.variable, bodyFont.variable].join(" ")}>
            <body>
                <GlobalStyles styles={`
                    @import url('');

                    .sam-icons {
                        font-family: var(--sam-icons);
                        font-weight: normal;
                        font-style: normal;
                        display: inline-block;
                        line-height: 1;
                        text-transform: none;
                        letter-spacing: normal;
                        word-wrap: normal;
                        white-space: nowrap;
                        direction: ltr;
                
                        -webkit-font-smoothing: antialiased;
                        text-rendering: optimizeLegibility;
                        -mos-osx-font-smoothing: grayscale;
                        font-feature-settings: 'liga';
                    }
                `} />
                {isClient &&
                    <ThemeProvider 
                        darkModeDefault={(/true/i).test(getCookie("samPortfolioDarkMode"))}
                        palettePresets={{default: {
                            primary: emerald,
                            secondary: cambridge,
                            tertiary: pale,
                            error: teaRose,
                            neutral: africanViolet
                        }}}
                    >
                        <Header />
                        {children}
                        <Footer />
                    </ThemeProvider>
                }
            </body>
        </html>
    );
}