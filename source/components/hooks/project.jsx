"use client"
import React, {createContext, useContext} from "react"

const ProjectContext = createContext({});

export default function useProjectContext() {
    const getOpenProject = () => {

    };
    const toggleProject = () => {

    };

    const projectContext = () => {
        return useContext(ProjectContext);
    };
    const ProjectProvider = ({children}) => {
        return (
            <ProjectContext.Provider value={{getOpenProject, toggleProject}}>
                {children}
            </ProjectContext.Provider>
        );
    };

    return {projectContext, ProjectProvider};
}