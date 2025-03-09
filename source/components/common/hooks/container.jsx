"use client"
import React, {createContext, useContext} from "react"

const ContainerContext = createContext({role: "neutral", type: "container"});

export default function useContainer() {
    const containerContext = () => {
        return useContext(ContainerContext);
    };
    const Container = ({role, type}) => {
        return (
            <ContainerContext.Provider value={{role, type}}>
                {children}
            </ContainerContext.Provider>
        );
    };

    return {containerContext, Container};
}