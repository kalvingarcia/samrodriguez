"use client"
import React, {createContext, useContext} from "react"

const ContainerContext = createContext({role: "neutral", type: "container"});
function Container({role, type, children}) {
    return (
        <ContainerContext.Provider value={{role, type}}>
            {children}
        </ContainerContext.Provider>
    );
};

export default function useContainer() {
    const containerContext = () => {
        return useContext(ContainerContext);
    };

    return {containerContext, Container};
}