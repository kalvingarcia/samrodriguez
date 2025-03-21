import {useEffect, useState} from 'react';

export default function useProject() {
    const getProjectFromURL = () => new URL(window.location.href).searchParams.get("open")?? undefined;
    const [project, setProject] = useState(undefined);

    const updateURL = (directory) => {
        const url = new URL(window.location.href);
        if (directory) {
            url.searchParams.set("open", directory);
        } else {
            url.searchParams.delete("open");
        }
        window.history.pushState({}, "", url);
        
        // Manually trigger a state update
        window.dispatchEvent(new Event("pushstate"));
    };

    useEffect(() => {
        setProject(getProjectFromURL);
        const handleLocationChange = () => {
            setProject(getProjectFromURL()); // Update state with latest URL
        };

        window.addEventListener("popstate", handleLocationChange);
        window.addEventListener("pushstate", handleLocationChange);

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.removeEventListener("pushstate", handleLocationChange);
        };
    }, []);

    useEffect(() => {
        console.log("Project updated:", project);
    }, [project]);

    return {project, openProject: updateURL, closeProject: () => updateURL(undefined)};
}