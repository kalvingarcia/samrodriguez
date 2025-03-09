import React from 'react';
import {tss} from './common/theme';

const useStyles = tss.create(({theme}) => ({

}));

export default function Footer({}) {
    const {classes} = useStyles({});
    return (
        <footer className={classes.footer}>
            <div>
                <span>Instagram</span>
                <span>LinkedIn</span>
            </div>
        </footer>
    );
}