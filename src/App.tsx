import { ChangeEvent, useEffect, useState, useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";
import CodeEditor from "./components/code-editor";

function App() {
  const [input, setInput] = useState("");

  const ref = useRef<any>();
  const iFrameRef = useRef<any>();

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

    iFrameRef.current.srcdoc = html;
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

    // setCode(result.outputFiles[0].text);
    iFrameRef.current.contentWindow.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  }; 

  const html = `
  <html>
    <head></head>
    <body>
      <div id=root></div>
      <script>
        window.addEventListener('message', (event)=>{
          try{
            eval(event.data)
          } catch (err){
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red;"><h4>Runtime Error</h4>' + err + '</div>';
            throw err;
          }
        }, false)
      </script>
    </body>
  </html>

`;

  return (
    <div>
      <CodeEditor
        initialValue="const a = 1"
        onChange={(value) => setInput(value)}
      />
      <textarea value={input} onChange={handleInput}></textarea>
      <div>
        <button onClick={handleCodeClick}>Submit</button>
      </div>
      <iframe
        title="preview"
        ref={iFrameRef}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>
  );
}

export default App;
