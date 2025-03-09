import React from 'react';
import {tss} from './common/theme';

const useStyles = tss.create(({theme}) => ({

}));

export default function Header({}) {
    const {classes} = useStyles({});
    return (
        <header className={classes.header}>
            <span>Sam Rodriguez</span>
            <div>
                <span>Work</span>
                <span>Contact</span>
            </div>
        </header>
    );
}