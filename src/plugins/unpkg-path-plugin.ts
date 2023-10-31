/* eslint-disable @typescript-eslint/no-explicit-any */
import * as esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      //handle root entry of index.js
      build.onResolve({ filter: /^index\.js/ }, () => {

        return { path: 'index.js', namespace: 'a' };
      });

      //checks with regex if ./ or ../ (relative paths)
      build.onResolve({ filter: /^\.+\// }, (args: any) => {

        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + "/").href
        };
      });

      build.onResolve({ filter: /.*/ }, async (args: any) => {

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        };

      });
    },
  };
};