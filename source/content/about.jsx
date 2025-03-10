import React from 'react';
import {tss} from '../components/common/theme';

const useStyles = tss.create(({theme}) => ({
    section: {

    }
}));

export default function About({}) {
    const {classes} = useStyles({});
    return (
        <section id="about" className={classes.section}>

        </section>
    );
}