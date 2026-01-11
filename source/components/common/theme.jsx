"use client"
import {createContext, useContext, useEffect, useRef, useState} from 'react';
import {NextAppDirEmotionCacheProvider} from "tss-react/next/appDir";
import {createTss, GlobalStyles} from 'tss-react';
import Color from 'color';
import 'material-symbols';

// The colors for the default palette.
const oxford = "#011638";
const charcoal = "#364156";
const honeydew = "#DFF8EB";
const melon = "#F0A49F";
const silver = "#CDCDCD";

const ThemeContext = createContext();
export function useTheme() {
    return useContext(ThemeContext);
}

export const tss = createTss({useContext: () => {
    return {theme: useContext(ThemeContext).theme};
}}).tss;

const lightness = {
    accent: 80,
    onAccent: 15,
    container: 50,
    onContainer: 90,
    background: 40,
    surfaceLowest: 50,
    surfaceLow: 52.5,
    surface: 55,
    surfaceHigh: 57.5,
    surfaceHighest: 60,
    onSurface: 95,
    rule: 60,
    shadow: 0
};

/**
 * The Themer is specifically made to cache styles using tss-react's NextAppDirEmotionCacheProvider. The component also has dark mode context
 * and theme context providers. These are specifically to allow the user to add and remove theme objects, change themes, and change scheme by
 * toggling dark mode. The themes are auto generated using color.js and a mapping object to map palette colors to the themes colors.
 * 
 * There are also global styles provided by the Themer which provides a reset to the HTML elements.
 * 
 * @param props The component only takes 1 prop. The `children` prop is specifically used to hold everything that will be themed.
 * @returns A React component.
 */
export default function ThemeProvider({themeDefault = "default", palettePresets, children}) {
    const paletteDictionary = useRef({
        default: {primary: oxford, secondary: charcoal, tertiary: honeydew, error: melon, neutral: silver},
        ...palettePresets
    });

    const addPalette = (themeName, paletteObject) => {
        if(!themeName || !paletteObject)
            return console.error("The function `addPalette` requires 2 arguments: themeName and paletteObject.");
        paletteDictionary.current[themeName] = paletteObject;
    };
    const removePalette = themeName => {
        if(!themeName)
            return console.error("The function `removePalette` requires 1 argument: themeName.");
        delete paletteDictionary.current[themeName];
    };

    const createTheme = (themeName, paletteObject) => {
        if(!paletteObject)
            paletteObject = paletteDictionary.current.default;
        try {
            const primary = Color(paletteObject.primary);
            const secondary = Color(paletteObject.secondary);
            const tertiary = Color(paletteObject.tertiary);
            const error = Color(paletteObject.error);
            const neutral = Color(paletteObject.neutral);

            // The object is populated with color objects, this gives the user finetuning abilities.
            // The theme name is also housed in the object so the user can display it
            return {
                name: themeName,
                primary: {
                    accent: primary.lightness(lightness.accent),
                    onAccent: primary.lightness(lightness.onAccent),
                    container: primary.lightness(lightness.container),
                    onContainer: primary.lightness(lightness.onContainer),
                },
                secondary: {
                    accent: secondary.lightness(lightness.accent),
                    onAccent: secondary.lightness(lightness.onAccent),
                    container: secondary.lightness(lightness.container),
                    onContainer: secondary.lightness(lightness.onContainer),
                },
                tertiary: {
                    accent: tertiary.lightness(lightness.accent),
                    onAccent: tertiary.lightness(lightness.onAccent),
                    container: tertiary.lightness(lightness.container),
                    onContainer: tertiary.lightness(lightness.onContainer),
                },
                error: {
                    accent: error.lightness(lightness.accent),
                    onAccent: error.lightness(lightness.onAccent),
                    container: error.lightness(lightness.container),
                    onContainer: error.lightness(lightness.onContainer),
                },
                neutral: {
                    background: neutral.lightness(lightness.background),
                    containerLowest: neutral.lightness(lightness.surfaceLowest),
                    containerLow: neutral.lightness(lightness.surfaceLow),
                    container: neutral.lightness(lightness.surface),
                    containerHigh: neutral.lightness(lightness.surfaceHigh),
                    containerHighest: neutral.lightness(lightness.surfaceHighest),
                    onContainer: neutral.lightness(lightness.onSurface),
                    rule: neutral.lightness(lightness.rule),
                    shadow: neutral.lightness(lightness.shadow)
                }
            };
        } catch(error) {
            // If the palette objects the user provided didn't name the properties necessary,
            // then an error is displayed.
            console.error("While creating a theme an error occured: " + error.message);
            return undefined;
        }
    };

    const [theme, setTheme] = useState(createTheme(themeDefault, paletteDictionary.current[themeDefault]));
    const changeTheme = (themeName) => {
        try {
            // The new theme is created.
            const newTheme = createTheme(themeName, paletteDictionary.current[themeName]);
            if(!newTheme) // If the theme isn't defined, then that means the palette object was structured incorrectly.
                return console.warn("Theme was not created sucessfully. Please ensure your palette object has primary, secondary, tertiary, error, and neutral as properties.");
            setTheme(newTheme);
        } catch(error) { // If an invalid themeName is given, then the function displays an error.
            console.error("While setting a theme an error occured: " + error.message); 
        }
    };

    const defaults = {
        "body *": {
            boxSizing: "border-box",
            "&::before, &::after": {
                boxSizing: "border-box",
                transition: "opacity 300ms ease"
            }
        },
        html: {
            MozTextSizeAdjust: "none",
            WebkitTextSizeAdjust: "none",
            textSizeAdjust: "none",
        },
        body: {
            backgroundColor: theme.neutral.background.hex(),
            color: theme.neutral.onContainer.hex()
        },
        "body, h1, h2, h3, h4, p, figure, blockquote, dl, dd": {
            margin: 0
        },
        'ul[role="list"], ol[role="list"]': {
            listStyle: "none"
        },
        html: {
            overflow: "hidden"
        },
        "html, body, #root": {
            position: "relative",
            width: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            height: "100%",
            overflowX: "hidden",
            lineHeight: 1,
            overscrollBehavior: "none", // This part was specifically to avoid MacOS overscroll, which was bugging me.
            fontWeight: "400",
            fontStyle: "normal",
            scrollBehavior: "smooth"
        },
        "#root": {
            scrollbarGutter: "stable",
            scrollbarWidth: "thin",
            scrollbarColor: `${theme.primary.accent.hex()} ${theme.primary.container.alpha(0.5).hexa()}`,
            transition: "scrollbar 300ms ease"
        },
        "h1, h2, h3, h4, button, input, label": {
            lineHeight: 1
        },
        "h1, h2, h3, h4": {
            textWrap: "balance"
        },
        "a": {
            "&:not([class])": {
                textDecorationSkipInk: "auto",
                color: "currentcolor"
            }
        },
        "img, picture": {
            maxWidth: "100%",
            display: "block"
        },
        "input, button, textarea, select": {
            font: "inherit"
        },
        "textarea": {
            "&:not([rows])": {
                minHeight: "10em"
            }
        },
        ":target": {
            scrollMarginBlock: "5ex"
        }
    };

    return (
        <NextAppDirEmotionCacheProvider options={{key: "css"}}>
            <ThemeContext.Provider value={{theme, palettes: paletteDictionary.current, changeTheme, addPalette, removePalette}}>
                <GlobalStyles styles={defaults} />
                {children}
            </ThemeContext.Provider>
        </NextAppDirEmotionCacheProvider>
    );
}