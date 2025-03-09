import React from 'react';
import {tss} from './common/theme';
import Header from './header';
import Footer from './footer';

const useStyles = tss.create(({theme}) => ({
    layout: {
        width: "100%",
        height: "100%"
    }
}));

export default function Layout({}) {
    const {classes} = useStyles({});
    return (
        <>
            <Header />
            <div>

            </div>
            <Footer />
        </>
    );
}