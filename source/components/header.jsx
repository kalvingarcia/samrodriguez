import React from 'react';
import {tss} from './common/theme';

const useStyles = tss.create(({theme}) => ({
    header: {
        padding: "20px",
        width: "100%",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",

        "&:hover": {
            backgroundColor: theme.neutral.containerLowest.hex()
        }
    },
    navlinks: {
        display: "flex",
        alignItems: "center",
        gap: "20px"
    }
}));

export default function Header({}) {
    const {classes} = useStyles({});
    return (
        <header className={classes.header}>
            <span>Sam Rodriguez</span>
            <div className={classes.navlinks}>
                <span>Work</span>
                <span>About</span>
                <span>Contact</span>
            </div>
        </header>
    );
}