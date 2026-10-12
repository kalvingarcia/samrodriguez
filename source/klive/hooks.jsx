"use client"
import {useEffect, useMemo, useState} from 'react';
import {getProjects, getRenderConfig, getAsset} from './api';
import {extractReferencedAssetIds} from './blocks/extract-asset-ids';

/** Published portfolio entries, with `cover` resolved to the cover asset or the body's first asset. */
export function useProjects() {
    const [state, setState] = useState({projects: [], loading: true, error: null});
    useEffect(() => {
        let cancelled = false;
        getProjects()
            .then(entries => {
                if(cancelled) return;
                const projects = entries.map(entry => ({
                    ...entry,
                    cover: entry.cover_asset_id?? extractReferencedAssetIds(entry.body)[0]
                }));
                setState({projects, loading: false, error: null});
            })
            .catch(error => {
                if(cancelled) return;
                console.error(error);
                setState({projects: [], loading: false, error});
            });
        return () => {cancelled = true;};
    }, []);
    return state;
}

/** The collection's render config, or `{}` (block defaults) until/unless it loads. */
export function useRenderConfig() {
    const [config, setConfig] = useState({});
    useEffect(() => {
        let cancelled = false;
        getRenderConfig().then(result => !cancelled && setConfig(result?? {})).catch(() => {});
        return () => {cancelled = true;};
    }, []);
    return config;
}

/** A single resolved asset, or undefined while loading / if it fails. */
export function useAsset(id, size = "full") {
    const [asset, setAsset] = useState();
    useEffect(() => {
        if(!id) return;
        let cancelled = false;
        getAsset(id, size).then(result => !cancelled && setAsset(result)).catch(() => {});
        return () => {cancelled = true;};
    }, [id, size]);
    return asset;
}

/** `Map<asset id, asset>` for every asset a Tiptap document references — the renderer's `assetsById`. */
export function useAssets(doc) {
    const ids = useMemo(() => extractReferencedAssetIds(doc), [doc]);
    const [assetsById, setAssetsById] = useState(() => new Map());
    useEffect(() => {
        let cancelled = false;
        // A missing asset just doesn't render, the same as in the klive preview.
        Promise.all(ids.map(id => getAsset(id).catch(() => null))).then(assets => {
            if(!cancelled) setAssetsById(new Map(assets.filter(Boolean).map(asset => [asset.id, asset])));
        });
        return () => {cancelled = true;};
    }, [ids]);
    return assetsById;
}
