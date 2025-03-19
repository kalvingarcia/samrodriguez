import React from 'react';
import {createRoot} from 'react-dom/client';
import {GlobalStyles} from 'tss-react';
import ThemeProvider from './components/common/theme';
import Layout from './components/layout';
import CaustenMedium from '../public/fonts/causten-medium.woff2';
import CaustenMediumOblique from '../public/fonts/causten-medium-oblique.woff2';
import CaustenSemiBold from '../public/fonts/causten-semi-bold.woff2';
import CaustenBold from '../public/fonts/causten-bold.woff2';
import CaustenExtraBold from '../public/fonts/causten-extra-bold.woff2';
import SamIcons from '../public/fonts/sam-icons.woff';

const lightBlue = "#b0dbe1";
const frenchGray = "#c2c7df"
const pinkLavender = "#edb7e2";
const flax = "#efe196";
const lilac ="#bbacd5";

function App() {
    const darkModeDefault = document.cookie.split("; ").find(row => row.startsWith("samPortfolioDarkMode="))
        ?.split("=")[1];

    return (
        <ThemeProvider 
            darkModeDefault={Boolean(darkModeDefault?? true)}
            palettePresets={{default: {
                primary: lightBlue,
                secondary: frenchGray,
                tertiary: pinkLavender,
                error: flax,
                neutral: lilac
            }}}
        >
            <GlobalStyles styles={`
                @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
                @font-face {
                    font-family: "Causten Medium";
                    font-weight: "normal";
                    font-style: "normal";
                    src: url(${CaustenMedium});
                }
                @font-face {
                    font-family: "Causten Medium";
                    font-weight: "normal";
                    font-style: "oblique";
                    src: url(${CaustenMediumOblique});
                }
                @font-face {
                    font-family: "Causten Medium";
                    font-weight: "bold";
                    font-style: "normal";
                    src: url(${CaustenSemiBold});
                }

                @font-face {
                    font-family: "Causten Bold";
                    font-weight: "normal";
                    font-style: "normal";
                    src: url(${CaustenBold});
                }

                @font-face {
                    font-family: "Causten Extra Bold";
                    font-weight: "normal";
                    font-style: "normal";
                    src: url(${CaustenExtraBold});
                }

                @font-face {
                    font-family: "Sam Icons";
                    src: url(${SamIcons});
                }
                .sam-icons {
                    font-family: "Sam Icons";
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

                :root {
                    --display-font: "Lobster", sans-serif;
                    --title-font: "Causten Extra Bold", sans-serif;
                    --heading-font: "Causten Bold", sans-serif;
                    --body-font: "Causten Medium", sans-serif;
                }
            `} />
            <Layout />
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")).render(<App />);