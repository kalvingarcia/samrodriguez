import React from 'react';
import {tss} from '../components/common/theme';

const useStyles = tss.create(({theme}) => ({
    section: {

    }
}));

export default function Projects({}) {
    const {classes} = useStyles({});
    return (
        <section id="projects" className={classes.section}>
            
        </section>
    );
}