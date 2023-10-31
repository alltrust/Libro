import localforage from "localforage";
import * as esbuild from 'esbuild-wasm';
import axios from "axios";

// MAYBE DELETE ME

export const fileCache = localforage.createInstance({
    name: "filecache"
});

const handleCSSData = (data: any) => {
    const escaped = data
        .replace(/\n/g, '')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");

    const contents =
        `
    const style = document.createElement('style')
    style.innerText = '${escaped}'
    document.head.appendChild(style)
    `;
    return contents;
};

export const handleFileCacheAndReturn = async (path: string, isCSS: boolean): Promise<esbuild.OnLoadResult> => {
    const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(path);

    if (cachedResult) {
        return cachedResult;
    }
    const { data, request } = await axios.get(path);
    let contents;

    if (isCSS) {
        contents = handleCSSData(data);
    }

    const result: esbuild.OnLoadResult = {
        loader: 'jsx',
        contents: contents && data,
        resolveDir: new URL('./', request.responseURL).pathname
    };

    await fileCache.setItem(path, result);

    return result;
};



