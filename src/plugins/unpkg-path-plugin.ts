/* eslint-disable @typescript-eslint/no-explicit-any */
import * as esbuild from 'esbuild-wasm';

//IIFE to check if connected - TO DELETE
// (async () => {
//   await fileCache.setItem('color', 'red')

//   const color = await fileCache.getItem('color')

//   console.log(color)
// })();

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {

      //handle root entry of index.js
      build.onResolve({ filter: /^index\.js/ }, () => {

        return { path: 'index.js', namespace: 'a' }
      });
      //checks with regex if ./ or ../ (relative paths)
      build.onResolve({ filter: /^\.+\// }, (args: any) => {

        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + "/").href
        }
      });
      //for root or main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args)


        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });

      
    },
  };
};