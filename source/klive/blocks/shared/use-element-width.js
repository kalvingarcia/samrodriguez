"use client"
import {useEffect, useRef, useState} from "react";

/** Tracks an element's content width via ResizeObserver — used by the Gallery flex-rows layout. */
export function useElementWidth(fallback = 640) {
    const ref = useRef(null);
    const [width, setWidth] = useState(fallback);

    useEffect(() => {
        const element = ref.current;
        if(!element) return;
        const observer = new ResizeObserver(entries => {
            const w = entries[0]?.contentRect.width;
            if(w) setWidth(w);
        });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return {ref, width};
}
