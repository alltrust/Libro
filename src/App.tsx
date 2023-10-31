import { ChangeEvent, useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

function App() {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const ref = useRef<any>();

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  useEffect(() => {
    startService();
  }, []);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleCodeClick = async () => {
    if (!ref.current) {
      return;
    }

    //transpile the jsx

    //string of production
    //and global is for safe keeping, replaces instances of these variables with the value
    // that you set
    const env = ["process", "env", "NODE_ENV"].join(".");
    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        [env]: '"production"',
        global: "window",
      },
    });

    console.log(result);
    setCode(result.outputFiles[0].text);
  };

  return (
    <div>
      <textarea value={input} onChange={handleInput}></textarea>
      <div>
        <button onClick={handleCodeClick}>Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
}

export default App;
