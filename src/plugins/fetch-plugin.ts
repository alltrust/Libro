import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: "filecache"
});

//remember that the inputCode is the content of the index.js file
export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            build.onLoad({ filter: /.*/ }, async (args: any) => {

                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode,
                    };
                }
                //see if we already have this request cached

                // const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path)

                // if (cachedResult) {
                //   return cachedResult;
                // }

                const { data, request } = await axios.get(args.path);

                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
                //you want to escape the single, double and newline characters
                // to ensure that you can pass css to the innerTxt without 
                // early termination

                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");

                const contents = fileType === "css" ?
                    `
                const style = document.createElement('style')
                style.innerText = '${escaped}'
                document.head.appendChild(style)
            ` : data;

                //if not- store response in cache
                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                }

                await fileCache.setItem(args.path, result)

                return result
            });
        }
    }
}