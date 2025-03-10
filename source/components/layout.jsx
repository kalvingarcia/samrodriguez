import React from 'react';
import {tss} from './common/theme';
import useProjectContext from './hooks/project';
import Header from './header';
import About from '../content/about';
import Projects from '../content/projects';
import Contact from '../content/contact';
import Footer from './footer';

const useStyles = tss.create(({theme}) => ({
    content: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        minHeight: "100%"
    }
}));

export default function Layout({}) {
    const {ProjectProvider} = useProjectContext();
    const {classes} = useStyles({});
    return (
        <ProjectProvider>
            <Header />
            <main className={classes.content}>
                <About />
                <Projects />
                <Contact />
            </main>
            <Footer />
        </ProjectProvider>
    );
}